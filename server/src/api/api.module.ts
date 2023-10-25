import { Module } from '@nestjs/common';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
import { ScriptController } from './script/script.controller';

@Module({
  controllers: [EmployeeController, ScriptController],
  providers: [EmployeeService]
})
export class ApiModule {}
