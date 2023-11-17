import { Module, OnModuleInit } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbSnakeNamingStrategy } from './db-snake-naming.strategy';
import { EmployeeService } from './api/employee/employee.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    // 加载 .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '.env',
        process.env.RUN_MODE == 'prod' ? '.env.prod' : '.env.dev',
      ],
    }),

    // 静态资源渲染
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'assets'),
      serveRoot: '/assets',
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
