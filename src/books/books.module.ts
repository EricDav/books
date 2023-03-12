import { Module } from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { BookService } from './books.service';
import { BookController } from './books.controller';

@Module({
  controllers: [BookController],
  providers: [BookService, AdvertismentService],
})
export class BooksModule {}
