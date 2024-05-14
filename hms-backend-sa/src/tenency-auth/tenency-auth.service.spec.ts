import { Test, TestingModule } from '@nestjs/testing';
import { TenencyAuthService } from './tenency-auth.service';

describe('TenencyAuthService', () => {
  let service: TenencyAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenencyAuthService],
    }).compile();

    service = module.get<TenencyAuthService>(TenencyAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
