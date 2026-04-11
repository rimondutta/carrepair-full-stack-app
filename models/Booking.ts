import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  preferredDate: Date;
  preferredTime?: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    vehicleMake: { type: String },
    vehicleModel: { type: String },
    vehicleYear: { type: Number },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

// Add indices for performance
BookingSchema.index({ status: 1 });
BookingSchema.index({ preferredDate: -1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ createdAt: -1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
