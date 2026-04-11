import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Notification from '@/models/Notification';
import { apiSuccess, apiError } from '@/lib/apiResponse';

/**
 * GET: Fetch recent notifications
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '10'));
    
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
      
    const unreadCount = await Notification.countDocuments({ isRead: false });

    return apiSuccess({ notifications, unreadCount });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}

/**
 * PATCH: Mark notifications as read
 */
export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, all } = body;

    if (all) {
      await Notification.updateMany({ isRead: false }, { isRead: true });
      return apiSuccess({ message: 'All notifications marked as read' });
    }

    if (id) {
      await Notification.findByIdAndUpdate(id, { isRead: true });
      return apiSuccess({ message: 'Notification marked as read' });
    }

    return apiError('Missing notification ID or "all" flag', 400);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}

/**
 * DELETE: Clear notifications
 */
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      await Notification.findByIdAndDelete(id);
      return apiSuccess({ message: 'Notification deleted' });
    }

    return apiError('Missing notification ID', 400);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
