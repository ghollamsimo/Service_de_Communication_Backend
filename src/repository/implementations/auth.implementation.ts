import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../../entities/user.entity';
import { AuthInterface } from "../interfaces/auth.interface";
import axios from 'axios';
import { AuthUserResponse } from 'src/types/auth.response';

export class AuthImplementation implements AuthInterface {
    constructor(
       
    ) { }

    async register(userEntity: UserEntity): Promise<AuthUserResponse> {

        try {
            const response = await axios.post('http://localhost:3002/auth/register', {
                email: userEntity.email,
                password: userEntity.password,
                name: userEntity.name,
                phone: userEntity.phone,
            });

            const createdUser = response.data;
            return createdUser;
        } catch (error) {
            throw new Error('Registration failed');
        }
    }


    async login(userEntity: UserEntity): Promise<{  token: string }> {

         try {
            const response = await axios.post('http://localhost:3002/auth/login', {
                email: userEntity.email,
                password: userEntity.password,
            });

            return { token: response.data.token };
        } catch (error) {
            throw new Error('Invalid credentials or authentication failed');
        }
      
 
    }
}
