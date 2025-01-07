
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username:username}).exec();
  }
  async addUser(username: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({ username: username, password: hashedPassword });
    return newUser.save();
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  


}
