import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { DataSource, Repository } from 'typeorm';
import { SHA256, enc } from 'crypto-js';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        private dataSource: DataSource,
    ) { }

    async ensureAdmin() {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const admin = await this.employeeRepository.findOne({where: {id: 1}});
            if (!admin) {
                const a = new Employee();
                a.id = 1;
                a.username = 'admin';
                a.password = enc.Base64.stringify(SHA256('123456'));
                await queryRunner.manager.save(a);
            }

            await queryRunner.commitTransaction();
        } catch(error) {
            console.error('error', error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
