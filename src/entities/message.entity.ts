enum StatusMessage{
    Sent = 'sent',
    Readed = 'readed',
    Failed = 'faild',
}

export class MessgaeEntity {
    constructor(
        private readonly senderId: string,
        private readonly chanelId: string,
        private readonly content: string,
        private readonly type: string,
        private readonly status: StatusMessage
    ){}
}