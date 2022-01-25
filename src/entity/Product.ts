import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OrderByCondition} from "typeorm";
import { Business } from "./business";

@Entity('product')
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    description: string;

    @Column({
        type: "numeric"
    })
    productPrice: number

    @ManyToOne(type => Business, business => business.product)
    business: Business;

    // @JoinColumn({
    //     name: "business_id"
    // })
    // business: Business
}