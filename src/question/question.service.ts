import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) private repo:Repository<Question>){}

    create(createQuestionDto : CreateQuestionDto,user:User){
        const createQuestion= this.repo.create(createQuestionDto)
        createQuestion.user=user;
        return this.repo.save(createQuestion)
    }

    async findOne(id:number){
        return this.repo.findOne({
            where:{id}
            }
        );
    }

    findAll(){
        return this.repo
        .createQueryBuilder()
        .select('que')
        .getRawMany()
    }

    async bookmarkQuestion(id:number,attrs:Partial<Question>){
        const question= await this.findOne(id)
        if(!question) 
            throw new NotFoundException('question not exists!');

        Object.assign(question,attrs)
        return this.repo.save(question)
    }
    
}
