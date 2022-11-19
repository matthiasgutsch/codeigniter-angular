import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { RefreshToken } from './refresh-token.entity';
import { Support } from 'src/supports/supports.entity';

@Entity({ name: 'users' })
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @ApiProperty({ example: 1, description: 'The Id of user', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'user1',
    description: 'The username',
    nullable: false,
  })
  @Column()
  @Index({ unique: true })
  username: string;

  @Exclude()
  @ApiProperty({
    example: 'password',
    description: 'The password',
    nullable: false,
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'Mario',
    description: 'The firstname of user',
    nullable: true,
  })
  @Column({ nullable: true, name: 'first_name' })
  firstName?: string;

  @ApiProperty({
    example: 'Rossi',
    description: 'The lastname of user',
    nullable: true,
  })
  @Column({ nullable: true, name: 'last_name' })
  lastName?: string;

  @ApiProperty({
    example: true,
    description: 'If the user is active',
    nullable: true,
    default: false,
  })
  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ApiProperty({
    example: 'en-US',
    description: 'The language of user',
    nullable: true,
  })
  @Column({ nullable: false, name: 'lang', default: 'en' })
  lang?: string;

  @Exclude()
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken[];

  @Exclude()
  @OneToMany(() => Support, (support) => support.user)
  supports: Support[];
}
