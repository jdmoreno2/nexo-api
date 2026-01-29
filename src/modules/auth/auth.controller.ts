import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/request/auth.dto';
import { Public } from 'src/common/decorators/public.decorato';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('signin')
  singIn(@Body() auth: AuthDto) {
    return this.authService.singIn(auth);
  }

}
