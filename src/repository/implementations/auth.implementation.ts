import { AuthInterface } from "../interfaces/auth.interface";
import {UserEntity} from "../../entities/user.entity";
import { GenericDao } from "../../dao/generic.dao";
import { User } from "../../schemas/user.schema";

export class AuthImplementation implements AuthInterface {
    private userDao: GenericDao<UserEntity>;

    constructor() {
        this.userDao = new GenericDao(User);
    }

    register(user: UserEntity): Promise<any> {
        return this.userDao.save(user);
    }
}
