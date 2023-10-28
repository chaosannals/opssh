import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
import { ScriptController } from './script/script.controller';
import { Employee } from './employee/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
  ],
  exports: [
    EmployeeService,
  ],
  controllers: [EmployeeController, ScriptController],
  providers: [EmployeeService]
})
export class ApiModule {}
