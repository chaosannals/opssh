import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbSnakeNamingStrategy } from './db-snake-naming-strategy';

@Module({
  imports: [
    ApiModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'opssh.db',
      autoLoadEntities: true,  
      synchronize: true,
      namingStrategy: new DbSnakeNamingStrategy("ops_"),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
