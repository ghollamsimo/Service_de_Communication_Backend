import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../entities/user.entity";
import { AuthUserResponse } from "src/types/auth.response";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      phone: number;
    }
  ): Promise<AuthUserResponse> {
    const userEntity = new UserEntity(
     
      body.email,
      body.password,
      body.name,
      body.phone
    );

    return this.authService.register(userEntity);
  }

  @Post("login")
  async login(
    @Body() body: { email: string; password: string }
  ): Promise<{token:string}> {
    const userEntity = new UserEntity(body.email, body.password);
    return this.authService.login(userEntity)
  }

  
}
