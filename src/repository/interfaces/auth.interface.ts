import { UserEntity } from "../../entities/user.entity";
import { AuthUserResponse } from "src/types/auth.response";

export interface AuthInterface {
    register(user: UserEntity): Promise<AuthUserResponse>;


    login(user: UserEntity): Promise< {token: string} >;

    
}
