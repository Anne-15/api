import {Entity, BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity('delivery')
export class Delivery extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
    @Column()
    phone_number: number;
}