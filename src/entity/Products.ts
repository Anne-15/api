import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  status: string;
}
