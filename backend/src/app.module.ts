import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './features/users/users.module';
import { BooksModule } from './features/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    UserModule,BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }