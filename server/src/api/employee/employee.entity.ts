import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from '../record.entity';
import { Permission } from 'src/auth/permission.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    password: string;

    @Column(type => Record, { prefix: false })
    record: Record;

    @OneToMany(() => EmployeePermission, permission => permission.employee, {createForeignKeyConstraints: false})
    permissions: Promise<EmployeePermission[]>;
}

@Entity()
export class EmployeePermission {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Employee, employee => employee.permissions, {createForeignKeyConstraints: false})
    employee: Promise<Employee>;

    @ManyToOne(() => Permission, permission => permission.employees, {createForeignKeyConstraints: false})
    permission: Promise<Permission>;
}