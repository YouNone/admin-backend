import { DeleteExeption } from './../share/errorhandlers/deleteExeption';
import { ParseQuery } from './../share/parse.query';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDivisionDto } from './dto/create.division.dto';
import { Division } from './division.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository, DeleteResult, createQueryBuilder, getManager } from 'typeorm';
import { UpdateDivisionDto } from './dto/update.division.dto';
@Injectable()

export class DivisionService {
    constructor(
        @InjectRepository(Division)
        private divisionRepository: TreeRepository<Division>
    ) { }

    async getDivisionsList(incomeQuery: ParseQuery): Promise<Division[]> {
        const searchOpt = new ParseQuery(incomeQuery, Object.keys(new Division()));
        console.log(incomeQuery);

        const query = this.divisionRepository
            .createQueryBuilder('divis')
            .skip(searchOpt.start)
            .take(searchOpt.limit)
            .where('divis.name LIKE :name', { name: `%${searchOpt.search}%` })
            .orderBy(searchOpt.order_field)
            .getMany();
        return await query;
    }

    async getDivisionTree(): Promise<Division[]> {
        // первый вариант получения дерева
        // const manager = getManager();
        // const treeCategories = await manager.getTreeRepository(Division).findTrees();

        const treeCategories = await this.divisionRepository.findTrees();        
        return treeCategories;
    }

    async CreateDivisionTreeItem(createDivisionDto: CreateDivisionDto): Promise<Division> {
        // const divisionParent = await this.divisionRepository.findOne(createDivisionDto.parent.id);
        // const division: Division = {
        //     name: createDivisionDto.name,
        //     parent: {
        //         id: (await divisionParent).id,
        //     }
        // }
        return this.divisionRepository.save(createDivisionDto);
    }

    async getDivisionById(id: number): Promise<Division> {
        const found = await this.divisionRepository.findOne(id);
        
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

    async  deleteDivision(id: number): Promise<DeleteResult> {
        const delDivision = await this.getDivisionById(id);
        console.log(delDivision);
        
        if (delDivision.children) {
            throw new NotFoundException(`you cannot delete division with children!`);
        }
 
        const result = await this.divisionRepository.delete(id);        
        if (result.affected === 0) {
            throw new DeleteExeption(id);
        }
        return {raw: result.raw, affected: result.affected };
    }

}


 // болванка для создания дерева в запрсое меняешь гет на сет

        // const homeDiv = new Division();
        // homeDiv.name = "home division";
        // await manager.save(homeDiv);

        // const secondRowDiv = new Division();
        // secondRowDiv.name = "secondRowDiv";
        // secondRowDiv.parent = homeDiv;
        // await manager.save(secondRowDiv);

        // const anotherSecondRowDiv = new Division();
        // anotherSecondRowDiv.name = "another Second Row Division";
        // anotherSecondRowDiv.parent = homeDiv;
        // await manager.save(anotherSecondRowDiv);

        // const thirdRowDiv = new Division();
        // thirdRowDiv.name = "third Row Division";
        // thirdRowDiv.parent = secondRowDiv;
        // await manager.save(thirdRowDiv);

        // const anotherThirdRowDiv = new Division();
        // anotherThirdRowDiv.name = "another Third Row Division";
        // anotherThirdRowDiv.parent = secondRowDiv;
        // await manager.save(anotherThirdRowDiv);