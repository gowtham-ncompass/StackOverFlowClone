import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentQuestionInterceptor } from './interceptors/current-question.interceptor';
import { bookmarksService } from './bookmarks.service';
import { Bookmarks } from './bookmarks.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Question,Bookmarks])],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    bookmarksService,
    {
      provide:APP_INTERCEPTOR,
      useClass:CurrentQuestionInterceptor
    }
  ]
})
export class QuestionModule {}
