import { EntityManager, In, Repository } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { Book } from './models/book.model';
import { Category } from './models/category.model';
import { Comment } from './models/comment.model';
import { User } from '../users/user.model';
import { Language } from './models/language.model';

@Injectable()
export class UserService {
    private bookRepo: Repository<Book>;
    private categoryRepo: Repository<Category>;
    private commentRepo: Repository<Comment>;
    private userRepo: Repository<User>;
    private languageRepo: Repository<Language>;

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
        this.bookRepo = this.entityManager.getRepository(Book);
        this.categoryRepo = this.entityManager.getRepository(Category);
        this.userRepo = this.entityManager.getRepository(User);
        this.commentRepo = this.entityManager.getRepository(Comment);
        this.languageRepo = this.entityManager.getRepository(Language);
    }

    async createBook(data) {
        try {
            const [user, category, language] = await Promise.all([
                this.userRepo.findOne({
                    where: {
                        id: data.userId
                    }
                }),
                this.categoryRepo.findOne({
                    where: {
                        id: data.categoryId
                    }
                }),
                this.languageRepo.findOne({
                    where: {
                        id: data.languageId
                    }
                })
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
        } catch(err) {

        }
    }
}