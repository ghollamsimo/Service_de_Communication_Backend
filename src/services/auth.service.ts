import { Injectable } from '@nestjs/common';
import { AuthImplementation } from '../repository/implementations/auth.implementation';
import { UserEntity } from '../entities/user.entity';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly authImplementation: AuthImplementation) {}

  async register(user: UserEntity): Promise<UserDocument> {
    return this.authImplementation.register(user);
  }
}
