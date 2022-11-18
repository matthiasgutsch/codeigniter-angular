import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  constructor(partial: Partial<RefreshToken>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 1,
    description: 'The Id of expire token',
    nullable: false,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'xxxxxx...',
    description: 'The reference uuid token',
    nullable: false,
  })
  @Column({
    nullable: false,
    unique: true,
  })
  uuid: string;

  @ApiProperty({
    example: 'xxxxxx...',
    description: 'The token',
    nullable: false,
  })
  @Column({
    nullable: false,
    unique: true,
  })
  token: string;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;

  @ApiProperty({
    example: '2022-12-31T22:13:3000',
    description: 'The date to expires',
    nullable: false,
  })
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  expires_at: Date;

  @ApiProperty({
    example: 1,
    description: 'The the id to assosiete user',
    nullable: false,
  })
  @ManyToOne(() => User, (user) => user.refreshToken)
  user: User;
}
