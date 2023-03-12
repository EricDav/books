import { User } from '../../users/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.model';
import { Comment } from './comment.model';
import { Language } from './language.model';
import { Favorite } from './favorite.model';

@Entity({ name: 'books' })
export class Book {
  @PrimaryColumn()
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  readCount: number;

  @Column({ nullable: false, default: 0  })
  viewCount: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  coverImage: string;

  @Column({ nullable: false })
  fileUrl: string;

  @ManyToOne((type) => User)
  user: User;

  @ManyToOne((type) => Category)
  category: Category;

  @ManyToOne((type) => Comment)
  comments: Comment;

  @Column('jsonb', {nullable: false, default: '[]'})
  tags: string[]

  @JoinTable()
  @OneToOne((type) => Language)
  language: Language;

  @OneToMany((type) => Favorite, (favorite) => favorite.book)
  favorites: Favorite[];

  @Column({nullable: false})
  readTime: number; // in minutes

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
