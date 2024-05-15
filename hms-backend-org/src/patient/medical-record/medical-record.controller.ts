import { Controller, Get, Post, Res, UploadedFile, UseInterceptors,Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { MedicalRecordService } from './medical-record.service';
import { diskStorage } from 'multer';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/gurard/auth.guard';
import { Roles } from '../decorators/roles.decorator';


@Controller('medical-record')
export class MedicalRecordController {
  constructor(private medicalRecordService: MedicalRecordService) {}

@UseGuards(AuthGuard)
@Roles('patient')
@Post('upload')
@UseInterceptors(FileInterceptor('file', { 
  storage: diskStorage({ destination: './uploads' }),
}))
async uploadFile(@UploadedFile() file: any,  @Req() req: Request) {
  console.log(file);
  await this.medicalRecordService.saveFile(file, req.session);
  return { filename: file.filename, session: req.session };
}

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('download/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = await this.medicalRecordService.getFile(filename);
    const path = join(process.cwd(), 'uploads', file.filename);
    res.download(path, file.originalname);
  }

  @UseGuards(AuthGuard)
  @Roles('patient')
  @Get('viewAllRecords')
  
  async viewAllRecords() {
    return this.medicalRecordService.findAll();
  }
  
}