import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Service from '@/models/Service';
import Post from '@/models/Post';
import { apiSuccess, apiError } from '@/lib/apiResponse';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return apiSuccess({ results: [] });
    }

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = { $regex: escapedQuery, $options: 'i' };

    // Search Collections in Parallel
    const [bookings, services, posts] = await Promise.all([
      Booking.find({
        $or: [
          { customerName: regex },
          { email: regex },
          { phone: regex }
        ]
      }).limit(5).select('customerName email serviceType status createdAt').lean(),
      
      Service.find({
        $or: [
          { title: regex },
          { category: regex }
        ]
      }).limit(5).select('title category slug isActive').lean(),
      
      Post.find({
        $or: [
          { title: regex },
          { tags: regex }
        ]
      }).limit(5).select('title status slug').lean()
    ]);

    // Format results for UI
    const results = [
      ...bookings.map((b: any) => ({
        id: b._id,
        title: b.customerName,
        subtitle: `${b.serviceType} - ${b.status}`,
        type: 'booking',
        link: `/admin/bookings`, // We don't have per-booking detail pages yet, so link to list
        date: b.createdAt
      })),
      ...services.map((s: any) => ({
        id: s._id,
        title: s.title,
        subtitle: s.category,
        type: 'service',
        link: `/admin/services`,
        date: s.createdAt
      })),
      ...posts.map((p: any) => ({
        id: p._id,
        title: p.title,
        subtitle: p.status,
        type: 'post',
        link: `/admin/posts`,
        date: p.createdAt
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return apiSuccess({ results });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
