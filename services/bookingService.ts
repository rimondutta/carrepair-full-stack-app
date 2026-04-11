import Booking, { IBooking } from '@/models/Booking';
import Notification from '@/models/Notification';
import { sendTelegramMessage, escapeHTML } from '@/lib/telegram';
import { logger } from '@/lib/logger';
import { connectDB } from '@/lib/mongodb';

export class BookingService {
  static async createBooking(data: Partial<IBooking>) {
    await connectDB();
    
    const booking = await Booking.create(data);

    // Run notifications asynchronously to avoid blocking user response
    this.sendNotifications(booking).catch(err => 
      logger.error('[BookingService Notification Error]', err)
    );

    return booking;
  }

  private static async sendNotifications(booking: IBooking) {
    const isContactForm = !booking.vehicleMake && !booking.vehicleModel;
    
    // 1. Internal Notification
    try {
      await Notification.create({
        title: isContactForm ? '✉️ New Contact Message' : '🚀 New Service Booking',
        message: `${booking.customerName} requested ${booking.serviceType}`,
        type: 'success',
        link: '/admin/bookings',
      });
    } catch (err) {
      logger.error('[Internal Notify Failed]', err);
    }

    // 2. Telegram Notification
    try {
      const safeName = escapeHTML(booking.customerName);
      const safePhone = escapeHTML(booking.phone);
      const safeService = escapeHTML(booking.serviceType);
      const safeNotes = escapeHTML(booking.notes || 'No special notes.');
      
      const vehicleInfo = !isContactForm 
        ? `\n<b>Vehicle:</b> ${escapeHTML(booking.vehicleYear?.toString() || '')} ${escapeHTML(booking.vehicleMake || '')} ${escapeHTML(booking.vehicleModel || '')}` 
        : '';
        
      const timeInfo = booking.preferredTime ? `\n<b>Time:</b> ${escapeHTML(booking.preferredTime)}` : '';

      const message = [
        `<b>${isContactForm ? '✉️ New Contact' : '🚀 New Booking'} Received!</b>`,
        '',
        `<b>Customer:</b> ${safeName}`,
        `<b>Phone:</b> ${safePhone}`,
        `<b>Service:</b> ${safeService}${vehicleInfo}`,
        `<b>Date:</b> ${escapeHTML(booking.preferredDate.toISOString().split('T')[0])}${timeInfo}`,
        '',
        `<b>Notes:</b>`,
        safeNotes
      ].join('\n');
      
      await sendTelegramMessage(message);
    } catch (err) {
      logger.error('[Telegram Notify Exception]', err);
    }
  }

  static async getAllBookings(options: {
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  } = {}) {
    await connectDB();
    const { 
      status, 
      search, 
      startDate, 
      endDate, 
      page = 1, 
      limit = 20 
    } = options;

    const filter: any = {}; // Using any here internally for MongoDB complex query building

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { customerName: { $regex: escapedSearch, $options: 'i' } },
        { email: { $regex: escapedSearch, $options: 'i' } },
      ];
    }

    if (startDate || endDate) {
      filter.preferredDate = {};
      if (startDate) filter.preferredDate.$gte = new Date(startDate);
      if (endDate) filter.preferredDate.$lte = new Date(endDate);
    }

    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return {
      bookings,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async updateBookingStatus(id: string, status: string) {
    await connectDB();
    return Booking.findByIdAndUpdate(id, { status }, { new: true });
  }
}
