export enum FriendRequestStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Blocked = 'Blocked',
    Canceled = 'Canceled',
}

export class FriendEntity {
    constructor(
        public readonly requesterId: string,
        public readonly receiverId: string,
        public readonly status: FriendRequestStatus,
    ) {}
}