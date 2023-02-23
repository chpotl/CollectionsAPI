import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthUserDto } from './dtos/auth-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/user/dtos/user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
// @Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async refreshToken(@Req() req: any, @Res({ passthrough: true }) res: any) {
    // console.log(req.cookies);
    const { refresh_token, access_token } = await this.authService.refreshToken(
      req.cookies?.refresh_token,
    );
    res.cookie('refresh_token', refresh_token);
    return { access_token };
  }

  @Post('signup')
  async createUser(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { refresh_token, access_token } = await this.authService.signup(
      body.username,
      body.password,
    );
    res.cookie('refresh_token', refresh_token);
    return { access_token };
  }

  @Post('login')
  async loginUser(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: any,
  ) {
    const { refresh_token, access_token } = await this.authService.login(
      body.username,
      body.password,
    );
    res.cookie('refresh_token', refresh_token);
    return { access_token };
  }
}
