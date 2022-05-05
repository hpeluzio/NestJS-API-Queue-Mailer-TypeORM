import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    // return req.user;
    // await this.authService.login(req.user);
    console.log(req.user);
    return {
      access_token: (await this.authService.login(req.user)).access_token,
      ...req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('profile: req.user: ', req.user);
    return req.user;
  }
}
