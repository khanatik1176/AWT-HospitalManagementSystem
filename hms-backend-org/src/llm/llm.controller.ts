// llm.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('llm')
export class LlmController {
  constructor(private llmService: LlmService) {}

  @Post('/v1/chat/completions')
  getChatCompletions(@Body() data: any) {
    return this.llmService.getChatCompletions(data);
  }
}