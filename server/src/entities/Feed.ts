/* eslint-disable import/no-cycle */
import FeedParser from 'feedparser';
import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { filterMeta } from '../feed-parser/filter-item';
import { Item } from './Item';
import { UserFeed } from './UserFeed';

@ObjectType()
@Entity()
export class Feed extends BaseEntity {
  addMeta(meta?: FeedParser.Meta) {
    const metaFiltered = filterMeta(meta);
    Object.assign(this, metaFiltered);
  }

  updateLastPubdate(items: Array<{ pubdate?: Date | null }>) {
    const lastPubdate = items.reduce<Date | null>((prevDate, { pubdate }) => {
      if (!pubdate) return prevDate;
      return !prevDate || pubdate > prevDate ? pubdate : prevDate;
    }, null);
    if (lastPubdate) this.lastPubdate = lastPubdate;
  }

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 2000, unique: true })
  url!: string;

  @Field({ nullable: true })
  @Column({ length: 2000, nullable: true })
  link: string;

  @Field({ nullable: true })
  @Column({ default: '', nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'text', default: '', nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  language: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  favicon: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  @Column({ default: '', nullable: true })
  imageTitle: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Date)
  @Column({ default: new Date(0) })
  lastSuccessfulUpd: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  lastPubdate?: Date;

  // TODO: should be protected
  @Field(() => [UserFeed], { nullable: true })
  @OneToMany(() => UserFeed, (userFeed) => userFeed.feed, { nullable: true })
  userFeeds: UserFeed[];

  // === DB ONLY FIELDS ===

  /** Activated means that it was added by user with confirmed email */
  @Column({ default: false })
  activated: boolean;

  @Column({ default: new Date(0) })
  lastUpdAttempt: Date;

  @OneToMany(() => Item, (item) => item.feed, { nullable: true })
  items: Item[];

  @Column({ default: 0 })
  throttled: number;
}
