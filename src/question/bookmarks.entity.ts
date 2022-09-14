import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,ManyToOne, OneToOne, JoinTable, JoinColumn} from 'typeorm'
import { User } from '../user/user.entity'
import { Question } from './question.entity'


@Entity()
export class Bookmarks{
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn({type:"datetime"})
    createdTime:Date

    @ManyToOne(()=>User,(user:User)=>user.questions)
    user:User

    @OneToOne(()=>Question,(question:Question) => question.bookmark)
    @JoinColumn()
    question:Question

}