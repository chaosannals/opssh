import { Module, OnModuleInit } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbSnakeNamingStrategy } from './db-snake-naming.strategy';
import { EmployeeService } from './api/employee/employee.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 加载 .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env',
        '.env.dev',
      ],
    }),
    
    // sqlite
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'sqlite',
          database: process.env.DB_NAME,
          logging: /(true|on|1)/i.test(process.env.DB_LOGGING), // 打印 SQL
          autoLoadEntities: true,
          synchronize: /(true|on|1)/i.test(process.env.DB_SYNC), //同步结构
          namingStrategy: new DbSnakeNamingStrategy("ops_"),
        }
      },
    }),
    ApiModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private employeeService: EmployeeService,
  ) { }

  async onModuleInit() {
    console.log('初始化默认用户:');
    await this.employeeService.ensureAdmin();
  }
}
