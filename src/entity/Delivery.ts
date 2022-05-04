import {Entity, BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity('delivery')
export class Delivery extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    first_name: string;

    @Column()
    last_name: string;
    
    @Column()
    phone_number: number;
}