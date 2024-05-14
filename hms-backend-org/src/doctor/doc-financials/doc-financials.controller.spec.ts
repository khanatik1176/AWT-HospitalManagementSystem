import { Test, TestingModule } from '@nestjs/testing';
import { DocFinancialsController } from './doc-financials.controller';
import { DocFinancialsService } from './doc-financials.service';

describe('DocFinancialsController', () => {
  let controller: DocFinancialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocFinancialsController],
      providers: [DocFinancialsService],
    }).compile();

    controller = module.get<DocFinancialsController>(DocFinancialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
