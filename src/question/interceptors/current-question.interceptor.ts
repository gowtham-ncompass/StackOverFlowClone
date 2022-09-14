import { NestInterceptor,ExecutionContext ,CallHandler  ,Injectable } from "@nestjs/common";
import { QuestionService } from "../question.service";

@Injectable()
export class CurrentQuestionInterceptor implements NestInterceptor{
    constructor(private questionService:QuestionService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request=context.switchToHttp().getRequest();
        const questionId =request.params.id
        
        if(questionId){
            const question=await this.questionService.findOne(questionId);
            request.currentQuestion=question;
        }
        return next.handle();
    }
}