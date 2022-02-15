import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity('retailer')
export class Retailer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    phone_number: number;

    @Column()
    business_name: string;

    @Column()
    business_description: string;

}