import { Test, TestingModule } from '@nestjs/testing';
import { MedicineListController } from './medicine-list.controller';
import { MedicineListService } from './medicine-list.service';

describe('MedicineListController', () => {
  let controller: MedicineListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineListController],
      providers: [MedicineListService],
    }).compile();

    controller = module.get<MedicineListController>(MedicineListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
