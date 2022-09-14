import { Module ,ValidationPipe} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';

const dbConfig = require('../ormconfig.js');

@Module({
  imports: 
  [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    QuestionModule,
    AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide:APP_PIPE,
      useValue:new ValidationPipe({whitelist:true})
    }],
})
export class AppModule {}
