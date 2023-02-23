import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      throw new BadRequestException('user already exist');
    }
    const hash = await bcrypt.hash(password, 2);
    const newUser = await this.userService.createUser(username, hash);
    return this.generateToken({ id: newUser._id, role: user.role });
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('incorrect username or password');
    }
    return this.generateToken({ id: user._id, role: user.role });
  }

  private generateToken(payload: any) {
    return {
      refresh_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    };
  }

  async refreshToken(refresh_token: string) {
    if (!refresh_token) {
      throw new UnauthorizedException('you dont have refresh token');
    }
    const payload = this.jwtService.verify(refresh_token);
    console.log(payload);
    if (!payload) {
      throw new UnauthorizedException('auth error');
    }
    return this.generateToken({ id: payload.id, role: payload.role });
  }
}
