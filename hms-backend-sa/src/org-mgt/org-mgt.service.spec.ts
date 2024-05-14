import { Test, TestingModule } from '@nestjs/testing';
import { OrgMgtService } from './org-mgt.service';

describe('OrgMgtService', () => {
  let service: OrgMgtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgMgtService],
    }).compile();

    service = module.get<OrgMgtService>(OrgMgtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
