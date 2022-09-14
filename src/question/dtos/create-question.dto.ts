import {IsString,IsBoolean,IsDate} from 'class-validator';

export class CreateQuestionDto{
    @IsString()
    que:string
}