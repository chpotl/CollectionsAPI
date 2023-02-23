import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new BadRequestException('user with such username already exist');
    }
    return await this.userModel.create({ username, password });
  }
  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }
}
