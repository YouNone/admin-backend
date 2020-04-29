import { ParseQuery } from './../share/parse.query';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDivisionDto } from './dto/create.division.dto';
import { Division } from './division.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository, getManager } from 'typeorm';
import { UpdateDivisionDto } from './dto/update.division.dto';
@Injectable()

export class DivisionService {
    constructor(
        @InjectRepository(Division) 
        private divisionRepository: Repository<Division>,
        // @InjectRepository(Division) 
        // private treeRepositiry: TreeRepository<Division>

    ) { }

    async getDivisionsList(incomeQuery: ParseQuery): Promise<Division[]> {
        const searchOpt = new ParseQuery(incomeQuery, Object.keys(new Division()));
        // console.log(searchOpt);
        console.log(incomeQuery);
        
        const query = this.divisionRepository
        .createQueryBuilder('divis')
        .skip(searchOpt.start)
        .take(searchOpt.limit)
        .where('divis.name LIKE :name', {name: `%${searchOpt.search}%`})
        .orderBy(searchOpt.order_field)
        .getMany();
        return await query;
    }

    async getDivisionTree() {

        const manager = getManager();
        // const trees = await manager.getTreeRepository(Division).findTrees();
        // console.log(trees);
                
    }

    async getDivisionById(id: number): Promise<Division> {
        const found = this.divisionRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Division with id ${id} not found`);
        }
        return found;
    }

    async createDivision(createDivisionDto: CreateDivisionDto): Promise<Division> {
        return await this.divisionRepository.save(createDivisionDto);
    }

    async updateDivision(id: number, updateDivisionDto: UpdateDivisionDto): Promise<Division> {
        updateDivisionDto.id = id;
        return await this.divisionRepository.save(updateDivisionDto);

    }

    async  deleteDivision(id: number): Promise<void> {
        const result = await this.divisionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Division with id "${id}" is not  found`);
        }
    }

}
