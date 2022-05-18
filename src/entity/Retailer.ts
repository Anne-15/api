import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne} from "typeorm";
import { Product } from "./Products";

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
    handle: string;

    @Column()
    description: string;

    // @OneToMany(() => Product, (product) => product.retailer)
    // product: Product


}