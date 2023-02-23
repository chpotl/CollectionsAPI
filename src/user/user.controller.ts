import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Serialize(UserDto)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    return this.userService.findById(req.user.id);
  }

  @Serialize(UserDto)
  // @UseGuards(JwtAuthGuard)
  @Get('/:username')
  async findUser(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('no such user');
    }
    return user;
  }
}
