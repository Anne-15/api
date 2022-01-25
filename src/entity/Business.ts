import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Product } from "./Product";
import { Retailer } from "./Retailer";

@Entity('business')
export class Business extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    businessName: string;

    @Column()
    description: string;

    @OneToMany(type => Product, product => product.business)
    product: Product[]

    @OneToOne(() => Retailer)
    @JoinColumn()
    retailer: Retailer;
    

}