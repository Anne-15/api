import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
import { Rider } from "./Rider";

@Entity("orders")
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item_name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  address: string;

  @OneToOne(() => Client, (client) => client.orders)
  @JoinColumn()
  client: Client;

  @OneToOne(() => Rider)
  @JoinColumn()
  ride: Rider;
}
