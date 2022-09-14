import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Bookmarks } from './bookmarks.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class bookmarksService {
    constructor(@InjectRepository(Bookmarks) private repo:Repository<Bookmarks>){}

    async findOne(id:number){
        return this.repo.findOne({
            where:{id}
            }
        );
    }

    findAll(){
        return this.repo
        .createQueryBuilder()
        .getRawMany()
    }

    async bookmarkQuestion(question:Question,attrs: any,user:User){
        if(!question) 
            throw new NotFoundException('question not exists!');

        if(attrs.bookmark){
            const questionInBookmark = await this.findOne(question.id)
            if(questionInBookmark){
                return "Question already added to bookmark!"
            }
            const bookmark= this.repo.create()
            bookmark.question=question
            bookmark.user=user
            return this.repo.save(bookmark)
        }
    }
    
    async getBookmarkedQuestion({id}:User){
        console.log(id)
        return this.repo
        .createQueryBuilder('bookmarks')
        .leftJoinAndSelect('bookmarks.question','question')
        .select(['question.que'])
        .where('bookmarks.userId =:id', {id})
        .getRawMany()

    }
}
