import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { OrgMgtService } from './org-mgt.service';
import { CreateOrgMgtDto } from './dto/create-org-mgt.dto';
import { UpdateOrgMgtDto } from './dto/update-org-mgt.dto';

@Controller('org-mgt')
export class OrgMgtController {
  constructor(private readonly orgMgtService: OrgMgtService) {}

  @Post('CreateOrg')
  addOrgData(@Body(ValidationPipe) createOrgMgtDto: CreateOrgMgtDto) {
    return this.orgMgtService.addOrgData(createOrgMgtDto);
  }

  @Get('SearchOrg/:OrgRegistrationNumber')
  searchOrgData(@Param('OrgRegistrationNumber') OrgRegistrationNumber: string) {
    return this.orgMgtService.searchOrgData(OrgRegistrationNumber);
  }

  // @Get()
  // findAll() {
  //   return this.orgMgtService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orgMgtService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrgMgtDto: UpdateOrgMgtDto) {
  //   return this.orgMgtService.update(+id, updateOrgMgtDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.orgMgtService.remove(+id);
  // }
}
