export class UserEntity {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public password: string,
        public readonly phone: number
    ) {}
}
