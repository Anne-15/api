import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rider')
export class Rider extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column(
        {
            unique: true
        }
    )
    email: string;

    @Column()
    phone_number: string;

    @Column()
    password: string;

    @Column()
    description: string;
    
}