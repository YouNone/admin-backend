import { alowedFields } from './../share/type';
import { ParseQuery } from './../share/parse.query';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';
import { Controller, Query, Get, UsePipes, ValidationPipe, Put, Delete, ParseIntPipe, Body, Param, Post } from '@nestjs/common';
import { Group } from './group.entity';

@Controller('groups')
export class GroupController {
    constructor(
        private groupService: GroupService,
    ) { }

    @Get()
    getAllGroups(@Query() queryParser) {
        const searcParams = new ParseQuery(queryParser, alowedFields);
        // console.log(searcParams); 
       return this.groupService.getGroupsList(searcParams);
    }

    @Get(':id')
    GetGroupbyId(@Param('id', ParseIntPipe) id: number): Promise<Group> {
        return this.groupService.getGroupById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
        // console.log(createGroupDto);
        return this.groupService.createGroup(createGroupDto);
    }

    @Put(':id')
	async updateItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateGroupDto: UpdateGroupDto
        ) {
        // return JSON.stringify(updateGroupDto);
        return this.groupService.updateGroup(id, updateGroupDto);
	}

    @Delete(':id')
    async deleteGroup(@Param('id', ParseIntPipe) id: number) {
        return  this.groupService.deleteGroup(id);
    }
}
