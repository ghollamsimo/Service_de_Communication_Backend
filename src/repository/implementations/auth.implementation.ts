import { AuthInterface } from "../interfaces/auth.interface";
import { UserEntity } from "../../entities/user.entity";
import { GenericDao } from "../../dao/generic.dao";
import { User, UserDocument } from "../../schemas/user.schema";

export class AuthImplementation implements AuthInterface {
    private userDao: GenericDao<UserDocument>;

    constructor() {
        this.userDao = new GenericDao(User);
    }

    async register(user: UserEntity): Promise<UserDocument> {
        const userDoc = new User({
            name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
        });

        return this.userDao.save(userDoc);
    }
}
