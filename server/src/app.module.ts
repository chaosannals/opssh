import { Module, OnModuleInit } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbSnakeNamingStrategy } from './db-snake-naming-strategy';
import { EmployeeService } from './api/employee/employee.service';

@Module({
  imports: [
    ApiModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'opssh.db',
      logging: true, // 打印 SQL
      autoLoadEntities: true,  
      synchronize: true,
      namingStrategy: new DbSnakeNamingStrategy("ops_"),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private employeeService: EmployeeService,
  ) {}

  async onModuleInit() {
      console.log('初始化默认用户:');
      await this.employeeService.ensureAdmin();
  }
}
