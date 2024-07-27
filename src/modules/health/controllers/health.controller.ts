import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {

  @Get()
  getHealth(): { isHealthy: true } {
    return { isHealthy: true };
  }
}
