import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";

@Entity('orders')
export class Orders extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_number: number;
    
    @Column()
    item_name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    customer_name: string;

    @Column()
    customer_number: number;

    @Column()
    address: string;

}