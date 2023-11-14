import { EmployeePermission } from "src/api/employee/employee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @OneToMany(() => EmployeePermission, employee => employee.permission, {createForeignKeyConstraints: false})
    employees: Promise<EmployeePermission[]>;
}