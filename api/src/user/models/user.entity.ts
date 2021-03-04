import { UseInterceptors } from "@nestjs/common";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserController } from "../controller/user.controller";
import { UserRole } from "./user.interface";





@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.BASIC_USER})
    role: UserRole;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}