import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OrderByCondition} from "typeorm";
import { Business } from "./business";

@Entity('product')
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;

    @Column()
    description: string;

    @Column({
        type: "numeric"
    })
    product_price: number

}