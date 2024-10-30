import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserEntity } from "../entities/user.entity";

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  store(@Body() body: { id: string; name: string; email: string; password: string; phone: number }): Promise<UserEntity> {
    const userEntity = new UserEntity(
        body.id,
        body.name,
        body.email,
        body.password,
        body.phone
    );

    return this.authService.save(userEntity);
  }
}
