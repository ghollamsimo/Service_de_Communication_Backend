export enum ChannelType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  DM = 'dm',
}

export class ChannelEntity {
  constructor(
    public readonly name: string,
    public readonly type: ChannelType,  
    public  members: { userId: string; role: 'owner' | 'moderator' | 'member' }[] = [], 
    public readonly bannedWords?: string[],
    public readonly safeMode: boolean = false
  ) {}
}
