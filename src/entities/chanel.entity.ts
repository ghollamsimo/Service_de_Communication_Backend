
export class ChannelEntity {
    constructor(
      public readonly name: string,
      public readonly type: string,
      public readonly ownerId: string,
      public readonly safeMode: boolean = false,
      public readonly bannedWords?: string[],
    ) {}
  }