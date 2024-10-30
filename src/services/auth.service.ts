import { Injectable } from '@nestjs/common';
import {AuthImplementation} from "../repository/implementations/auth.implementation";

@Injectable()
export class AuthService {
  constructor(private _authImplementation: AuthImplementation) {
    this._authImplementation = new AuthImplementation()
  }

  save(user){
      return this._authImplementation.register(user)
  }
}
