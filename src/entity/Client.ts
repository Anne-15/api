import {Entity, BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity('client')
export class Client extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;
    
    @Column()
    phone_number: number
}