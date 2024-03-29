import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { VisitTypesService } from './visit-types.service';
import { ProgramsService } from '../programs/programs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('visit-types')
export class VisitTypesController {
  constructor(
    private visitTypeService: VisitTypesService,
    private programService: ProgramsService
  ) {}
  @Get()
  findAll() {
    return this.visitTypeService.findAll();
  }
  @Get('program')
  async findProgramVisitTypes(@Query('programUuid') programUuid: string) {
    const program = await this.programService.findIdFromUuid(programUuid);
    return this.visitTypeService.findProgramVisitTypes(program.id);
  }
  @Get(':visitTypeUuid')
  findByUuid(@Param('visitTypeUuid') visitTypeUuid: string) {
    return this.visitTypeService.findByUuid(visitTypeUuid);
  }
  @Post()
  async create(@Body() body: { programUuid: string; name: string }) {
    const { programUuid, name } = body;
    const program = await this.programService.findIdFromUuid(programUuid);
    const payLoad = {
      programId: program.id,
      name: name,
    };
    return this.visitTypeService.create(payLoad);
  }
}
