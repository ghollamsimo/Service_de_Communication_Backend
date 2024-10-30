import { UserEntity } from "../../entities/user.entity";

export interface AuthInterface {
    register(user: UserEntity): Promise<UserEntity>;
}
