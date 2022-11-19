import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SupportsController } from './supports.controller';
import { Support } from './supports.entity';
import { SupportsService } from './supports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Support]), UsersModule],
  providers: [SupportsService],
  controllers: [SupportsController],
})
export class SupportsModule {}
