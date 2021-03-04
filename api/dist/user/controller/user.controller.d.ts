import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class UserController {
    private userServices;
    constructor(userServices: UserService);
    create(user: User): Observable<User | Object>;
    login(user: User): Observable<Object>;
    findOne(params: any): Observable<User>;
    index(page?: number, limit?: number): Observable<Pagination<User>>;
    deleteOne(id: string): Observable<User>;
    updateOne(id: string, user: User): Observable<any>;
    updateRoleOfUser(id: string, user: User): Observable<User>;
}
