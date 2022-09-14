import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,ManyToOne, OneToMany} from "typeorm";
import { User } from "src/user/user.entity";
import { Question } from "src/question/question.entity";
import { Upvote } from "./upvote.entity";

@Entity()
export class Answer{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    ans:string

    @Column({default:0})
    upvotes:number

    @Column({default:0})
    downvote:number

    @CreateDateColumn({type:"datetime"})
    createdTime:Date

    @ManyToOne(()=>Question,(question)=>question.answers)
    question:Question

    @ManyToOne(()=>User,(user:User)=>user.questions)
    user:User

    @OneToMany(()=>Upvote,(upvote:Upvote)=>upvote.answer)
    upvote:Upvote[]


}