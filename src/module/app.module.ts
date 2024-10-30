import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserModelSchema} from "../schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/communication'),
    MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }]),
  ],  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
