import { Controller, Get } from '@nestjs/common';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('health')
@Public()
export class HealthController {

  @Get()
  getHealth(): { isHealthy: true } {
    return { isHealthy: true };
  }
}
