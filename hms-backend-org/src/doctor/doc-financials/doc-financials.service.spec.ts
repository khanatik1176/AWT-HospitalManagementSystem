import { Test, TestingModule } from '@nestjs/testing';
import { DocFinancialsService } from './doc-financials.service';

describe('DocFinancialsService', () => {
  let service: DocFinancialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocFinancialsService],
    }).compile();

    service = module.get<DocFinancialsService>(DocFinancialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
