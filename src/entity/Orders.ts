import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";

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
    customer_number: number;

}