import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { chanelService } from "../services/chanel.service";
import { ChannelDocument } from "src/schemas/chanel.schema";
import { ChannelEntity } from "src/entities/chanel.entity";
import { Types } from "mongoose";
import { AuthMidllware } from "../gards/auth.gard";

@Controller("chanels")
@UseGuards(AuthMidllware)
export class ChanelsController {
  constructor(private readonly chanelService: chanelService) {}

  @Get("all")
  async getAllChanels(): Promise<ChannelDocument[]> {
    return this.chanelService.getAllChanels();
  }

  @Get("chanel/:id")
  async getChanelById(@Param("id") id: string): Promise<ChannelDocument> {
    return this.chanelService.getChanelById(id);
  }

  @Post("create")
  createChanel(
    @Request() req,
    @Body()
    body: {
      name?: string;
      type?: string;
      members?: string[];
      moderators?: string[];
      bannedWords?: string[];
    },
  ): Promise<ChannelDocument> {
    const ownerId = req.user._id;
    if (!Types.ObjectId.isValid(ownerId)) {
      throw new BadRequestException("Invalid ownerId");
    }
    if (
      body.members &&
      !body.members.every((id) => Types.ObjectId.isValid(id))
    ) {
      throw new BadRequestException("Invalid memberId in members");
    }
    if (
      body.moderators &&
      !body.moderators.every((id) => Types.ObjectId.isValid(id))
    ) {
      throw new BadRequestException("Invalid moderatorId in moderators");
    }
    const ChanelEntity = new ChannelEntity(
      body.name,
      body.type,
      ownerId,
      body.members,
      body.moderators,
      body.bannedWords,
    );
    return this.chanelService.createChanel(ChanelEntity);
  }

  @Patch("update/:id")
  updateChanel(
    @Request() req,

    @Param("id") id: string,
    @Body()
    body: {
      name?: string;
      type?: string;
      members?: string[];
      moderators?: string[];
      bannedWords?: string[];
    },
  ): Promise<ChannelDocument> {
    const ownerId = req.user._id;

    if (ownerId && !Types.ObjectId.isValid(ownerId)) {
      throw new BadRequestException("Invalid ownerId");
    }
    if (
      body.members &&
      !body.members.every((id) => Types.ObjectId.isValid(id))
    ) {
      throw new BadRequestException("Invalid memberId in members");
    }
    if (
      body.moderators &&
      !body.moderators.every((id) => Types.ObjectId.isValid(id))
    ) {
      throw new BadRequestException("Invalid moderatorId in moderators");
    }
    const ChanelEntity = new ChannelEntity(
      body.name,
      body.type,
      ownerId,
      body.members,
      body.moderators,
      body.bannedWords,
    );

    return this.chanelService.updateChanel(id, ChanelEntity);
  }

  @Delete("delete/:id")
  async deleteChanel(@Request() req, @Param("id") id: string) {
    const ownerId = req.user._id;
    return this.chanelService.deleteChanel(id, ownerId);
  }
}
