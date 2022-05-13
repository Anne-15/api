import { JoinColumn, JoinTable, OneToOne, PrimaryColumn } from "typeorm";

const {Entity, BaseEntity, Column, PrimaryGeneratedColumn} = require ("typeorm");

@Entity('client')
export class Client extends BaseEntity{
    
    @PrimaryColumn()
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