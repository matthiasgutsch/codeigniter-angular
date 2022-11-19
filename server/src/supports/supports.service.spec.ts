import { Test, TestingModule } from '@nestjs/testing';
import { SupportsService } from './supports.service';

describe('SupportsService', () => {
  let service: SupportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportsService],
    }).compile();

    service = module.get<SupportsService>(SupportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
