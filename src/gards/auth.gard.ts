import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthMidllware implements CanActivate {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();


    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    
   
      const response = await axios.get<{ email: string }>('http://localhost:3002/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const email = response.data.email;
            
      if (!email) {
        throw new UnauthorizedException('Email not found in token');
      }

      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
       
      request.user = user;

      return true;
  
  }
}
