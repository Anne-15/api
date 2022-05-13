import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Entity("rider")
export class Rider extends BaseEntity {
  @PrimaryColumn()
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

  @Column()
  description: string;

//   @OneToOne(() => Orders, (orders) => orders.ride)
//   orders: Orders;
}
