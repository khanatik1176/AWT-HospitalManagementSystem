// llm.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LlmService {
  constructor(private httpService: HttpService) {}

  processData(data: any) {
    return {
      model: data.model || "aaditya/OpenBioLLM-Llama3-8B-GGUF",
      messages: [
        { role: "system", content: "Always answer in rhymes." },
        { role: "user", content: data.message }
      ],
      temperature: data.temperature || 0.7,
      max_tokens: data.max_tokens || -1,
    };
  }

  async getChatCompletions(data: any) {
    const processedData = this.processData(data);
    const response = await this.httpService.post('http://localhost:1234/v1/chat/completions', processedData).toPromise();
  
    // Extract the content from the response
    const content = response.data.choices[0].message.content;
  
    return content;
  }
}