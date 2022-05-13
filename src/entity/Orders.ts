import {Entity, Column, BaseEntity, OneToMany, OneToOne, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { Client } from "./Client";
import { Retailer } from "./Retailer";
import { Rider } from "./Rider";

@Entity('orders')
export class Orders extends BaseEntity {

    @PrimaryColumn()
    id: number;
    
    @Column()
    item_name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    address: string;

    @OneToOne(() => Client)
    @JoinColumn()
    client: Client

    @OneToOne(() => Rider)
    @JoinColumn()
    ride: Rider
}