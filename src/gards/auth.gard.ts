import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { AuthUserResponse } from 'src/types/auth.response';

@Injectable()
export class AuthMidllware implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; 

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const response = await axios.get<AuthUserResponse>('http://localhost:3002/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       
      request.user = response.data; 
    } catch (error) {
      throw new UnauthorizedException('Invalid token or user not found');
    }

    return true; 
  }
}
