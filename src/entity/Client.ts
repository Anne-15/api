import { JoinColumn, JoinTable, OneToOne } from "typeorm";
import { Profile } from "./Profile";

const {Entity, BaseEntity, Column, PrimaryGeneratedColumn} = require ("typeorm");

@Entity('client')
export class Client extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    full_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
    
    @Column()
    phone_number: number

}