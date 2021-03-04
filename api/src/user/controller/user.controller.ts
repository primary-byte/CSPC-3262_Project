import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { fromEventPattern, Observable, of } from 'rxjs';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { catchError, map } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Pagination } from 'nestjs-typeorm-paginate';

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
    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userServices.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt};
            })
        )
    }
    
    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userServices.findOne(params.id);
    }

 
    @Get()
    index( @Query('page') page: number = 1, @Query('limit') limit: number = 10, ): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;

        return this.userServices.paginate({page, limit, route: 'http://localhost:3000/user'});
    }

    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<User> {
        return this.userServices.deleteOne(Number(id));        
    }

    @Put(':id')
    updateOne(@Param('id')id: string, @Body() user: User): Observable<any> {
        return this.userServices.updateOne(Number(id),user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userServices.updateRoleOfUser(Number(id), user);
    }

}
