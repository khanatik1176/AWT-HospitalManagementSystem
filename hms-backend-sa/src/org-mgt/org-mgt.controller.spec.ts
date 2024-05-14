import { Test, TestingModule } from '@nestjs/testing';
import { OrgMgtController } from './org-mgt.controller';
import { OrgMgtService } from './org-mgt.service';

describe('OrgMgtController', () => {
  let controller: OrgMgtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgMgtController],
      providers: [OrgMgtService],
    }).compile();

    controller = module.get<OrgMgtController>(OrgMgtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
