import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,ManyToOne, OneToMany, OneToOne} from 'typeorm'
import { User } from '../user/user.entity'
import { Answer } from 'src/answer/answer.entity'
import { Bookmarks } from './bookmarks.entity'


@Entity()
export class Question{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    que:string

    @CreateDateColumn({type:"datetime"})
    createdTime:Date

    
    @ManyToOne(()=>User,(user:User)=>user.questions)
    user:User

    @OneToMany(()=>Answer,(answer)=>answer.question)
    answers:Answer[]

    @OneToOne(()=>Bookmarks,(bookmark:Bookmarks)=>bookmark.question)
    bookmark:Bookmarks
}