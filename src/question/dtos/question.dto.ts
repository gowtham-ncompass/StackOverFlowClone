import { Expose, Transform } from 'class-transformer';

export class QuestionDto {
  @Expose()
  id: number;
  
  @Expose()
  que:string

  @Expose()
  createdTime:Date

}
