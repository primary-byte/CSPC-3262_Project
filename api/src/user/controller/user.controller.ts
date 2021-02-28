import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { catchError, map } from 'rxjs/operators';

@Controller('user')
export class UserController {
    constructor(private userServices: UserService){ }
    
    @Post()
    create(@Body()user: User): Observable<User | Object>  {
        return this.userServices.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        );
    }
    @Post()
    login(@Body() user: User): Observable<Object> {
        return this.userServices.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt};
            })
        )
    }
    
    @Get(':id')
    findOne(@Param()params): Observable<User> {
        return this.userServices.findOne(params.id);
    }

    @Get()
    findAll(): Observable<User[]> {
        return this.userServices.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<User> {
        return this.userServices.deleteOne(Number(id));        
    }

    @Put(':id')
    updateOne(@Param('id')id: string, @Body() user: User): Observable<any> {
        return this.userServices.updateOne(Number(id),user);
    }
}
