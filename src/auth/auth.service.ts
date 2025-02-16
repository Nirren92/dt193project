import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (!user || !(await this.usersService.validatePassword(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async addUser(username: string, password: string) {
    return this.usersService.addUser(username, password);
  }

}