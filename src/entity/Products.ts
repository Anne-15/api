import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Retailer } from "./Retailer";

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

  // @ManyToOne(() => Retailer, (retailer) => retailer.product)
  // retailer: Retailer 
}
