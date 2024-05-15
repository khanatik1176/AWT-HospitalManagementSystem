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
      max_tokens: data.max_tokens || 500,
      stream: data.stream || true
    };
  }

  async getChatCompletions(data: any) {
    const processedData = this.processData(data);
    const response = await this.httpService.post('http://localhost:1234/v1/chat/completions', processedData).toPromise();
    
    console.log(response.data.choices[0].delta.content);

    // Store the responses in an array
    const responses = Array.isArray(response.data) ? response.data : [response.data];
    
  
    let message = '';
    responses.map(item => {
      if (item.choices && Array.isArray(item.choices)) {
        item.choices.map(choice => {
          if (choice.delta && choice.delta.content) {
            message += choice.delta.content;
          }
        });
      }
    });
    
    return message;
  }
}