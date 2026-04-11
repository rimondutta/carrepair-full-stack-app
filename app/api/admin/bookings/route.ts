import { NextRequest } from 'next/server';
import { apiSuccess, apiHandler } from '@/lib/apiResponse';
import { BookingService } from '@/services/bookingService';

export const GET = apiHandler(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  
  const options = {
    status: searchParams.get('status') || undefined,
    search: searchParams.get('search') || undefined,
    startDate: searchParams.get('startDate') || undefined,
    endDate: searchParams.get('endDate') || undefined,
    page: Math.max(1, parseInt(searchParams.get('page') || '1')),
    limit: Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20'))),
  };

  const result = await BookingService.getAllBookings(options);

  return apiSuccess(result);
});
