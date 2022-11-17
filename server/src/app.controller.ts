import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';
import { User } from './decorators/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('billings/count_total_no_paid/:id')
  @UseGuards(AccessTokenGuard)
  billings_count_total_no_paid(): number {
    return 4;
  }

  @Get('supports/count/:id')
  @UseGuards(AccessTokenGuard)
  supports_count(@User() user): number {
    console.log(user);
    return 4;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}
