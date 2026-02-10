import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/request/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async singIn(auth: AuthDto) {
    const user = await this.usersService.findOneByEmail(auth.email);

    const isValid = user && (await bcrypt.compare(auth.password, user.password_hash));

    const isActive = user && user.status == 1;

    if (!isValid || !isActive) {
      throw new BadRequestException('Credenciales inválidas');
    }

    // Se debe comprobar el role cuando se agregue

    const payload = {
      sub: user.identifier,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        identifier: user.identifier,
        email: user.email,
        name: user.name,
        avatar: user.avatar_url,
      }
    };
  }

}
