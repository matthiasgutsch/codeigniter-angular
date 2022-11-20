import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'new_supports' })
export class Support {
  constructor(partial: Partial<Support>) {
    Object.assign(this, partial);
  }
  @ApiProperty({
    example: 1,
    description: 'The Id of supports',
    nullable: false,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'user1',
    description: 'The username',
    nullable: false,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'example@exemple.com',
    description: 'The email of assistence',
    nullable: false,
  })
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+12 345 678 9123',
    description: 'Phone of assistence',
    nullable: false,
  })
  @Column({ nullable: false })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty({
    example: 'Some assistence',
    description: 'The title of assistence',
    nullable: true,
  })
  @Column({ nullable: true })
  title?: string;

  @ApiProperty({
    example: 'lorem ipsum',
    description: 'The message',
    nullable: false,
  })
  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  message?: string;

  @Column({
    nullable: true,
  })
  refId?: number;

  // @ApiProperty({
  //   example: 1,
  //   description: 'The reference message',
  //   nullable: true,
  // })
  @ManyToOne(() => Support, (support) => support.refs, { nullable: true })
  ref: Support;

  @OneToMany(() => Support, (support) => support.ref, { nullable: true })
  refs: Support[];

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ApiProperty({
    example: '1',
    description: 'The status',
    nullable: false,
  })
  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  status?: string;

  @ApiProperty({
    example: true,
    description: 'If the assistence is active',
    nullable: true,
    default: false,
  })
  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @Column()
  userId: number;

  // @ApiProperty({
  //   example: 1,
  //   description: 'The the id to assosiete user',
  //   nullable: false,
  // })
  // @Exclude()
  @Type(() => User)
  @ManyToOne(() => User, (user) => user.supports)
  user: User;
}
