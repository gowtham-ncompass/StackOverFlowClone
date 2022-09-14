import { Controller, Post ,Body, Session,Get,BadRequestException,UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard'
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('user')
@Serialize(UserDto)
export class UserController {

    constructor(private userService :UserService){}

    @Post('/signup')
    async createUser(@Body() body:CreateUserDto,@Session() session:any){
        const user=await this.userService.create(body.email,body.password)
        session.userId=user.id
        return user;

    }

    @Post('/signin')
    async signin(@Body() body:CreateUserDto,@Session() session:any){
        const user=await this.userService.signin(body.email,body.password);
        session.userId=user.id
        return user;
    }
    
    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
      return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
      if(session.userId===null) throw new BadRequestException("No user is signed in!")
      session.userId = null;
      return "OOPS! Signed Out!"
    }

}
