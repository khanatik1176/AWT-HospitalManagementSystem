import { Test, TestingModule } from '@nestjs/testing';
import { RepMgtController } from './rep-mgt.controller';
import { RepMgtService } from './rep-mgt.service';

describe('RepMgtController', () => {
  let controller: RepMgtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepMgtController],
      providers: [RepMgtService],
    }).compile();

    controller = module.get<RepMgtController>(RepMgtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
