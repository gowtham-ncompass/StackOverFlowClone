import { Expose, Transform } from 'class-transformer';

export class AnswerDto {
  @Expose()
  id: number;
  
  @Expose()
  ans:string

  @Expose()
  createdTime:Date

}
