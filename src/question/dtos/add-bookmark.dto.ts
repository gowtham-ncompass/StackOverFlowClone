import { Expose ,Transform} from "class-transformer";

export class AddBookmark{

  @Expose()
  id: number;

  @Expose()
  createdTime:Date

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  
}
