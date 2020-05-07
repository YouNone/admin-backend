import { Controller, Get, Query, Param, UsePipes, ParseIntPipe, Put, Post, Delete, Body, ValidationPipe } from '@nestjs/common';

import { Scale } from './scale.entity';
import { ScaleService } from './scale.service';
import { alowedFields } from './../share/type';
import { ParseQuery } from './../share/parse.query';
import { UpdateScaleDto } from './dto/update-scale.dto';
import { CreateScaleDto } from './dto/create-scale.dto';

@Controller('scales')
export class ScaleController {
    constructor(
        private scaleService: ScaleService
    ) {

    }
    @Get()
    getAllTasks(@Query() queryParser) {
        const searcParams = new ParseQuery(queryParser, alowedFields);
        // console.log(searcParams); 
        return this.scaleService.getScalesList(searcParams);
    }

    @Get(':id')
    GetTaskbyId(@Param('id', ParseIntPipe) id: number): Promise<Scale> {
        return this.scaleService.getScaleById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createScaleDto: CreateScaleDto): Promise<Scale> {
        // console.log(createScaleDto);
        return this.scaleService.createScale(createScaleDto);
    }

    @Put(':id')
    async updateItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateScaleDto: UpdateScaleDto
    ) {
        // return JSON.stringify(ScaleTaskDto);
        return this.scaleService.updateScale(id, updateScaleDto);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.scaleService.deleteScale(id);
    }
}