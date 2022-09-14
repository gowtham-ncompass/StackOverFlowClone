import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Question } from "../question/question.entity";
import { Answer } from "src/answer/answer.entity";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @Column()
    password:string

    @OneToMany(() => Question, (question) => question.user)
    questions:Question[]

    @OneToMany(()=>Answer,(answer)=>answer.user)
    answers:Answer[]

}