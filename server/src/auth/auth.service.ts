import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SHA256, enc } from 'crypto-js';
import { EmployeeService } from '../api/employee/employee.service';
import { Employee } from 'src/api/employee/employee.entity';
import { type CaptchaObj, create as createCaptcha } from 'svg-captcha';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly employeeService: EmployeeService,
    ) { }

    // 验证码
    makeCaptcha(size: number = 4): CaptchaObj {
        const captcha = createCaptcha({
            size,
            fontSize: 50,
            width: 100,
            height: 34,
            background: '#f4f4f4',
        });
        return captcha
    }

    // 验证
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
