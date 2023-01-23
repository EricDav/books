import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';

// console.log(config, 'config.....');

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    BooksModule
 ],
  controllers: [],
  providers: [],
})
export class AppModule {}
