enum StatusMessage{
    Sent = 'sent',
    Readed = 'readed',
    Failed = 'faild',
}

export class MessageEntity {
    constructor(
        private readonly senderId: string,
        private readonly channelId: string,
        private readonly content: string,
        private readonly status: StatusMessage = StatusMessage.Sent
    ){}
}