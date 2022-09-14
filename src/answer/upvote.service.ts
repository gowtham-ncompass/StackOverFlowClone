import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { Upvote } from './upvote.entity';

@Injectable()
export class UpvoteService {
    constructor(@InjectRepository(Upvote) private repo:Repository<Upvote>){}

    async findOne(id:number){
        return this.repo.findOne({
            where:{id}
            }
        );
    }

    async upVoteAnswer(answer:Answer,user:User){
        if(!answer) 
            throw new NotFoundException("No answer found!")

        const upvote = this.repo.create()
        upvote.answer = answer
        upvote.user = user
        return  this.repo.save(upvote)     
    }

   
}
