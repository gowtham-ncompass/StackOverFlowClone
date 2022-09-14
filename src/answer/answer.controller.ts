import { Controller,Post,Param,Body,Get,NotFoundException ,UseGuards,Query} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AnswerDto } from './dtos/answer.dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { currentQuestion } from 'src/question/decorators/current-question.decorator';
import { Question } from 'src/question/question.entity';
import { WriteAnswerDto } from './dtos/write-answer.dto';
import { UpvoteService } from './upvote.service';

@Controller()
@UseGuards(AuthGuard)
export class AnswerController {
    constructor(private answerService:AnswerService,private upvoteService:UpvoteService){}


    @Post('/:id/write-answer')
    @Serialize(AnswerDto)
    writeAnswer(@Body() body:WriteAnswerDto,@CurrentUser() user:User,@currentQuestion() question:Question){
        return this.answerService.writeAnswer(body,user,question)
    }

    @Get('/:id/answers')
    getAnswersForQuestion(@Query() query : any, @CurrentUser() user:User,@currentQuestion() question:Question){
        return this.answerService.getAnswersForQuestion(query.order,user,question)
    }

    @Get('/:queId/answers/:ansId')
    async upVoteAnswer(@Param('ansId') ansId:string, @CurrentUser() user:User){

        const answer= await this.answerService.findOne(parseInt(ansId))
        const upvote = await this.upvoteService.upVoteAnswer(answer,user)

        if(upvote)
            return this.answerService.countUpVote(answer)
        
        return "upvote not added"

    }

}
