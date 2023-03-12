import { EntityManager, In, Repository } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as shortid from 'shortid';

import { Book } from './models/book.model';
import { Category } from './models/category.model';
import { Comment } from './models/comment.model';
import { User } from '../users/user.model';
import { Language } from './models/language.model';
import { handleErrorCatch } from 'src/utils/helper';
import { Role } from '../users/models/role.model';
import { UserRole } from 'src/users/models/userRole.model';
import { Tag } from './models/tag.model';

@Injectable()
export class BookService {
  private bookRepo: Repository<Book>;
  private categoryRepo: Repository<Category>;
  private commentRepo: Repository<Comment>;
  private userRepo: Repository<User>;
  private roleRepo: Repository<Role>;
  private languageRepo: Repository<Language>;
  private tagRepo: Repository<Tag>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.bookRepo = this.entityManager.getRepository(Book);
    this.categoryRepo = this.entityManager.getRepository(Category);
    this.userRepo = this.entityManager.getRepository(User);
    this.commentRepo = this.entityManager.getRepository(Comment);
    this.languageRepo = this.entityManager.getRepository(Language);
    this.tagRepo = this.entityManager.getRepository(Tag)
  }

  async createBook(data) {
    try {
      const [user, category, language] = await Promise.all([
        this.userRepo.findOne({
          where: {
            id: data.userId,
          },
        }),
        this.categoryRepo.findOne({
          where: {
            id: data.categoryId,
          },
        }),
        this.languageRepo.findOne({
          where: {
            id: data.languageId,
          },
        }),
      ]);

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `user with the id ${data.userId} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!category) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Category with the id ${data.categoryId} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!language) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Language with the id ${data.languageId} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (data.tags) {
        const tags = await this.tagRepo.find({
          where: {
            name: In(data.tags)
          }
        });

        if (tags.length != data.tags.length) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: `One or more tags not found`,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      delete data.tokenData;
      const book = await this.bookRepo.save({
        ...data,
        id: shortid()
      });

      return {
        book,
        message: 'Book stored successfully',
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async updateBook(data) {
    try {
      const book = await this.bookRepo.findOne({
        where: {
          id: data.id,
        },
      });

      if (!book) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Book with the id ${data.id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (data.languageId) {
        data.language = {
          id: data.languageId,
        };
      }

      await this.bookRepo.save({
        ...book,
        ...data,
        id: book.id,
      });

      return {
        message: 'Book updated successfully',
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async deleteBook(data) {
    try {
      await this.bookRepo.delete({
        id: data.id,
      });

      return {
        message: 'Book deleted successfully',
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async getBook(data) {
    try {
      const book = await this.bookRepo.findOne({
        where: {
          id: data.id,
        },
        relations: ['user', 'category', 'favorites'],
      });

      if (!book) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Book with the id ${data.id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        book,
        message: 'Fetched book successfully',
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async fetchBooks(data) {
    try {
      const books = await this.bookRepo
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.user', 'user')
        .leftJoinAndSelect('book.favorites', 'favorites')
        .getMany();

      return {
        books,
        message: 'Fetched all books successfully',
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async createCategory(data) {
    try {
      delete data.tokenData;
      const category = await this.categoryRepo.save({
        ...data
      });

      return {
        category,
        message: 'Category created successfully',
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async updateCategory(data) {
    try {
      const category = await this.categoryRepo.findOne({
        where: {
          id: data.id,
        },
      });

      if (!category) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Category with the id ${data.id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.categoryRepo.save({
        ...data,
        id: category.id,
      });

      return {
        message: 'Category updated successfully',
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async deleteCategory(data) {
    try {
      await this.categoryRepo.delete({
        id: data.id,
      });

      return {
        success: true,
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async fetchAllCategory() {
    try {
      return await this.categoryRepo.find();
    } catch(err) {
      handleErrorCatch(err);
    }
  }

  async fetchSingleCategory(data) {
    try {
      const category = await this.categoryRepo.find({
        where: {
          id: data.id
        }
      });

      if (!category) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Category with the id ${data.id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Fetched category successfully',
        category
      }
    } catch(err) {
      handleErrorCatch(err);
    }
  }

  async getFavourites(data) {
    try {
      const books = await this.bookRepo
        .createQueryBuilder('book')
        .innerJoin('book.favorites', 'favorites')
        .where(`favorites.userId = :userId`, { userId: data.userId })
        .getMany();

      return {
        favorites: books,
      };
    } catch (err) {}
  }

  async getPublishers(data) {
    try {
      const publishers = await this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.books', 'books')
        .leftJoinAndSelect('books.favorites', 'fovorites')
        .innerJoinAndMapMany(
          'user.userRole',
          UserRole,
          'userRoles',
          'user.id = userRoles.userId',
        )
        .innerJoinAndMapMany(
          'user.role',
          Role,
          'roles',
          'user_roles.roleId = roles.id',
        )
        .where(`roles.name = 'publisher'`)
        .getMany();

      return {
        publishers,
      };
    } catch (err) {
      handleErrorCatch(err);
    }
  }

  async addTag(data) {
    try {
      const tag = await this.tagRepo.save({
        name: data.name
      });

      return {
        tag,
        message: 'Tag action created successfully'
      }
    } catch(err) {
      handleErrorCatch(err);
    }
  }

  async fetchAllTags() {
    try {
      return await this.tagRepo.find();
    } catch(err) {
      handleErrorCatch(err);
    }
  }

  async fetchSingleTag(data) {
    try {
      const tag = await this.tagRepo.findOne({
        where: {
          id: data.id
        }
      });

      if (!tag) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Tag with the id ${data.id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        tag
      }

    } catch(err) {
      handleErrorCatch(err);
    }
  }

  async deleteTag(data) {
    try {
      await this.tagRepo.delete({
        id: data.id
      });

      return {
        message: 'Tag action deleted successfully'
      }
    } catch(err) {
      handleErrorCatch(err);
    }
  }
}
