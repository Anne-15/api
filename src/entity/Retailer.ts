import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity('retailer')
export class Retailer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    phone_number: number;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    ig_handle: string;

}