import { Module } from "@nestjs/common";
import { ConfiigModule } from "./config.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfiigModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
