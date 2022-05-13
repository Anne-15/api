import { JoinColumn, JoinTable, OneToOne, PrimaryColumn } from "typeorm";
import { Orders } from "./Orders";

const {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
} = require("typeorm");

@Entity("client")
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone_number: string;

  @OneToOne(() => Orders, (orders) => orders.client)
  orders: Orders;
}
