import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Upvote } from './upvote.entity';
import { UpvoteService } from './upvote.service';

@Module({
  imports:[TypeOrmModule.forFeature([Answer,Upvote])],
  controllers: [AnswerController],
  providers:[AnswerService,UpvoteService]
})
export class AnswerModule {}
