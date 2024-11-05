import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthImplementation } from '../repository/implementations/auth.implementation';

@Module({
  imports: [
   

   
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthImplementation],
  exports: [AuthImplementation],
})
export class AuthModule {}