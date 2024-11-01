import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthImplementation } from '../repository/implementations/auth.implementation';
import { User, UserModelSchema } from '../schemas/user.schema';

@Module({
  imports: [
   
    MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthImplementation],
  exports: [AuthImplementation],
})
export class AuthModule {}