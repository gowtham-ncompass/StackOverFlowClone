import { Injectable,BadRequestException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo:Repository<User> ){}

    async create(email:string,password:string){
        const users=await this.findAll(email)
        if(users.length)
            throw new BadRequestException("Email exists already")

        const user= this.repo.create({email,password})
        return this.repo.save(user)
    }

    async findOne(id:number){
        if(!id) 
            throw new BadRequestException("No users found!");
        
        return this.repo.findOne({
            where:{id}
            });
    }

    findAll(email:string){
        return this.repo.find({
            where:{email}
        })
    }

    async signin(email:string,password:string){
        const [user]=await this.findAll(email);

        if(!user)
            throw new NotFoundException('User not Found!')
        
        if(user.password !== password) 
            throw new BadRequestException("Wrong Password!Please try again")

        return user;
    }
}
