import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OrderByCondition} from "typeorm";

@Entity('profile')
export class Profile extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    phone_number: string

}