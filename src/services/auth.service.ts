import { Injectable } from "@nestjs/common";
import { AuthImplementation } from "../repository/implementations/auth.implementation";
import { UserEntity } from "../entities/user.entity";
import { AuthUserResponse } from "src/types/auth.response";

@Injectable()
export class AuthService {
  constructor(private readonly authImplementation: AuthImplementation) {}

  async register(user: UserEntity): Promise<AuthUserResponse> {
    return this.authImplementation.register(user);
  }

  async login(user: UserEntity): Promise<{ token: string }> {
    return this.authImplementation.login(user);
  }
}
