import { Division } from './division.entity';
import { DivisionService } from './division.service';
import { Controller, Post, UsePipes, Param, Get, Put, Body, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { DivisionFilterDto } from './dto/division.filter.dto';
import { CreateDivisionDto } from './dto/create.division.dto';
import { UpdateDivisionDto } from './dto/update.division.dto';

@Controller('divisions')
export class DivisionController {
    constructor(
        private divisionService: DivisionService,
    ) { }

    @Get()
    getAllDivisions(@Query() filterDto: DivisionFilterDto) {
        return this.divisionService.getDivisionsList(filterDto);
    }

    // @Get('tree')
    // getDivisionsTree() {
    //     return this.divisionService.getDivisionTree();
    // }

    @Get(':id')
    GetDivisionbyId(@Param('id', ParseIntPipe) id: number): Promise<Division> {
        return this.divisionService.getDivisionById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createDivision(@Body() createDivisionDto: CreateDivisionDto): Promise<Division> {
        console.log(createDivisionDto);
        return this.divisionService.createDivision(createDivisionDto);
    }

    @Put(':id')
    async updateItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDivisionDto: UpdateDivisionDto
    ) {
        // return JSON.stringify(updateDivisionDto);
        return this.divisionService.updateDivision(id, updateDivisionDto);
    }

    @Delete(':id')
    async deleteDivision(@Param('id', ParseIntPipe) id: number) {
        return this.divisionService.deleteDivision(id);
    }
}
