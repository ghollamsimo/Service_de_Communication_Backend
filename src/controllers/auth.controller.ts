import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserEntity } from "../entities/user.entity";
import { UserDocument } from "../schemas/user.schema";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
      @Body() body: { name: string; email: string; password: string; phone: number }
  ): Promise<UserDocument> {
    const userEntity = new UserEntity(
        body.name,
        body.email,
        body.password,
        body.phone
    );
    
    return this.authService.register(userEntity);
  }
}