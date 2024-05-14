import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { MedicineListService } from './medicine-list.service';
import { CreateMedicineListDto } from './dto/create-medicine-list.dto';
import { UpdateMedicineListDto } from './dto/update-medicine-list.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/auth/gurard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';


@Controller('medicine-list')
export class MedicineListController {
  
  constructor(private readonly medicineListService: MedicineListService) {}

  @Post('AddMedicine')
  create(@Body(ValidationPipe) createMedicineListDto: CreateMedicineListDto) {
    return this.medicineListService.createMedicineRepository(createMedicineListDto);
  }

  @Post('UploadMedicineImage/:med_id')
  @UseInterceptors(FileInterceptor('file', { 
    storage: diskStorage({ destination: './uploads' }),
  }))
  async uploadFile(@Param('med_id', ParseIntPipe) med_id: number, @UploadedFile() file: any, @Req() req: Request) {
    console.log(file);
    await this.medicineListService.uploadMedicineImg(med_id, file);
    return { filename: file.filename };
  }

  @UseGuards(AuthGuard)
  @Roles('doctor')
  @Get('ViewMedicineList')
  viewAllMedicine() {
    return this.medicineListService.viewAllMedicine();
  }

  @UseGuards(AuthGuard)
  @Roles('doctor')
  @Get('ViewMedicineList/:med_id')
  viewSingleMedicine(@Param('med_id', ParseIntPipe) med_id: number) {
    return this.medicineListService.viewSingleMedicine(med_id);
  }

  @UseGuards(AuthGuard)
  @Roles('doctor')
  @Patch('UpdateMedicineInfo/:med_id')
  update(@Param('med_id', ParseIntPipe) med_id: number, @Body() updateMedicineListDto: UpdateMedicineListDto) {
    return this.medicineListService.updateMedicineInfo(med_id, updateMedicineListDto);
  }

}
