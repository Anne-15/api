import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn} from "typeorm";

@Entity('business')
export class Business extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    business_name: string;

    @Column()
    description: string;
    

}