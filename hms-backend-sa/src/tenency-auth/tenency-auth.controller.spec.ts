import { Test, TestingModule } from '@nestjs/testing';
import { TenencyAuthController } from './tenency-auth.controller';
import { TenencyAuthService } from './tenency-auth.service';

describe('TenencyAuthController', () => {
  let controller: TenencyAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenencyAuthController],
      providers: [TenencyAuthService],
    }).compile();

    controller = module.get<TenencyAuthController>(TenencyAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
