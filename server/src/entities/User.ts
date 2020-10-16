/* eslint-disable import/no-cycle */
import { ObjectType, Field } from 'type-graphql';
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { UserFeed } from './UserFeed';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true, default: null })
    password?: string;

    @Field(() => [UserFeed], { nullable: true })
    @OneToMany(() => UserFeed, (userFeed) => userFeed.user, { nullable: true })
    userFeeds: UserFeed[];

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}