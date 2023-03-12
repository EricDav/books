import {
  Controller,
  Inject,
  Get,
  Req,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './books.service';
import { AdvertismentService } from './advertisment.service';

@Controller('/v1')
export class BookController {
  constructor(
    @Inject(BookService)
    @Inject(AdvertismentService)
    private readonly bookService: BookService,
    private readonly advertismentService: AdvertismentService,
  ) {}

  @Post('/books')
  async createBook(@Req() data: any): Promise<any> {
    return this.bookService.createBook(data.body);
  }

  @Put('/books/:id')
  async updateBook(@Req() data: any): Promise<any> {
    return this.bookService.updateBook(data.body);
  }

  @Delete('/books/:id')
  async deleteBook(@Req() data: any): Promise<any> {
    return this.bookService.deleteBook(data.params);
  }

  @Get('/books')
  async fetchBooks(@Req() data: any): Promise<any> {
    return this.bookService.fetchBooks(data.query);
  }

  @Get('/books/:id')
  async getBook(@Req() data: any): Promise<any> {
    return this.bookService.getBook(data.params);
  }

  @Post('/books/category')
  async createCategory(@Req() data: any): Promise<any> {
    return this.bookService.createCategory(data.body);
  }

  @Get('/books/category/all')
  async fetchCategory(@Req() data: any): Promise<any> {
    return this.bookService.fetchAllCategory();
  }

  @Get('/books/category/all')
  async fetchSingleCategory(@Req() data: any): Promise<any> {
    return this.bookService.fetchAllCategory();
  }

  @Get('/books/single-category/:id')
  async updateCategory(@Req() data: any): Promise<any> {
    return this.bookService.fetchSingleCategory({ ...data.params });
  }

  @Delete('/books/category/:id')
  async deleteCategory(@Req() data: any): Promise<any> {
    return this.bookService.deleteCategory(data.params);
  }

  @Post('/advertisments')
  async createAdvertisment(@Req() data: any): Promise<any> {
    return this.advertismentService.create(data.body);
  }

  @Put('/advertisments/:id')
  async updateAdvertisment(@Req() data: any): Promise<any> {
    return this.advertismentService.update({ ...data.body, ...data.params });
  }

  @Get('/advertisments')
  async getAdvertisments(@Req() data: any): Promise<any> {
    return this.advertismentService.find();
  }

  @Get('/advertisments/:id')
  async getAdvertisment(@Req() data: any): Promise<any> {
    return this.advertismentService.findOne(data.params);
  }

  @Delete('/advertisments/:id')
  async deleteAdvertisment(@Req() data: any): Promise<any> {
    return this.advertismentService.deleteAdvert(data.params);
  }

  @Post('/tags')
  async addTag(@Req() data: any): Promise<any> {
    return this.bookService.addTag(data.body);
  }

  @Get('/tags')
  async fetchTags(@Req() data: any): Promise<any> {
    return this.bookService.fetchAllTags();
  }

  @Get('/tags/:id')
  async fetchSingleTag(@Req() data: any): Promise<any> {
    return this.bookService.fetchSingleTag(data.params);
  }

  @Delete('/tags/:id')
  async deleteTag(@Req() data: any): Promise<any> {
    return this.bookService.deleteTag(data.params);
  }
}
