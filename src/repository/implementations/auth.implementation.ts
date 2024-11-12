import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserEntity } from "../../entities/user.entity";
import { AuthInterface } from "../interfaces/auth.interface";
import axios from "axios";
import { AuthUserResponse } from "src/types/auth.response";
import { User, UserDocument } from "src/schemas/user.schema";

export class AuthImplementation implements AuthInterface {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async register(userEntity: UserEntity): Promise<AuthUserResponse> {
    const newUser = new this.UserModel({
      email: userEntity.email,
      name: userEntity.name,
      phone: userEntity.phone,
    });

    const savedUser = await newUser.save();

    try {
      const response = await axios.post("http://localhost:3002/auth/register", {
        email: userEntity.email,
        password: userEntity.password,
        name: userEntity.name,
        phone: userEntity.phone,
      });

      const createdUser = response.data;
      return createdUser;
    } catch (error) {
      await this.UserModel.findByIdAndDelete(savedUser._id);
      throw new Error("Registration failed");
    }
  }

  async login(userEntity: UserEntity): Promise<{ token: string }> {
    try {
      const response = await axios.post("http://localhost:3002/auth/login", {
        email: userEntity.email,
        password: userEntity.password,
      });

      return { token: response.data.token };
    } catch (error) {
      throw new Error("Invalid credentials or authentication failed");
    }
  }
}
