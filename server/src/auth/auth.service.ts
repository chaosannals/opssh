import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SHA256, enc } from 'crypto-js';
import { EmployeeService } from '../api/employee/employee.service';
import { Employee } from 'src/api/employee/employee.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly employeeService: EmployeeService,
    ) { }

    async validateEmployee(username: string, pass: string): Promise<any> {
        const employee = await this.employeeService.validate(username, pass);
        if (employee) {
            return {
                id: employee.id,
                username,
            };
        }

        return null;
    }


    // 登录
    async login(employee: any) {
        const payload = {
            id: employee.id,
            username: employee.username,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
