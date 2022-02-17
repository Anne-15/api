import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Client } from "./Client";
import { Delivery } from "./Delivery";

@Entity('orders')
export class Orders extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    item: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    customer_name: string;

    @Column()
    customer_number: string;

}