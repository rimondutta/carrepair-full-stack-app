import { apiSuccess, apiHandler } from '@/lib/apiResponse';
import { ServiceService } from '@/services/serviceService';

export const GET = apiHandler(async () => {
  const { services, source } = await ServiceService.getActiveServices();
  return apiSuccess({ services, source });
}, {
  maxRequests: 60,
  windowMs: 60 * 1000
});
