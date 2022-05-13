import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Entity("rider")
export class Rider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ unique: true })
  phone_number: string;

  @Column()
  password: string;

  @OneToOne(() => Orders, (orders) => orders.ride)
  orders: Orders;
}
