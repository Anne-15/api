import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Client } from "./Client";
import { Delivery } from "./Delivery";

@Entity('orders')
export class Orders extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    

}