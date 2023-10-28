import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from '../record.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({nullable: true})
    password: string;

    @Column(type => Record, {prefix: false})
    record: Record;
}