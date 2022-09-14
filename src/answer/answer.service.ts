import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { Question } from 'src/question/question.entity';
import { WriteAnswerDto } from './dtos/write-answer.dto';

@Injectable()
export class AnswerService {
    constructor(@InjectRepository(Answer) private repo:Repository<Answer>){}

    async writeAnswer(body:WriteAnswerDto,user:User,question:Question){
        const answer = this.repo.create(body)
        answer.user=user;
        answer.question=question;

        return this.repo.save(answer)
    }

    async findOne(id:number){
        return this.repo.findOne({
            where:{id}
            }
        );
    }

    async getAnswersForQuestion(order:string,user:Partial<User>,question:Partial<Question>){
        return this.repo
        .createQueryBuilder('answer')
        .where('questionId = :queId',{queId:question.id})
        .leftJoinAndSelect('answer.question','question')
        .select(['question.que','question.createdTime','answer.ans','answer.createdTime','answer.upvotes'])
        .orderBy(`answer.${order}`,'DESC')
        .getRawMany()
    }

    async upVoteAnswer(ansId:number){
        const answer =await this.findOne(ansId)
        Object.assign(answer,{"upvotes":answer.upvotes+1})

        return this.repo.save(answer)
    }

    async countUpVote(answer:Answer){
        Object.assign(answer,{"upvotes":answer.upvotes+1})
        return this.repo.save(answer)
    }
}
