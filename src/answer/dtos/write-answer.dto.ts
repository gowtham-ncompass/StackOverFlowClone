import {IsString,IsBoolean,IsDate} from 'class-validator';

export class WriteAnswerDto{
    @IsString()
    ans:string
}