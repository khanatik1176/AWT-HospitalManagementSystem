import { Test, TestingModule } from '@nestjs/testing';
import { MedicineListService } from './medicine-list.service';

describe('MedicineListService', () => {
  let service: MedicineListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineListService],
    }).compile();

    service = module.get<MedicineListService>(MedicineListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
