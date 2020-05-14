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
        private repo: TreeRepository<Division>
    ) { }

    async getDivisionsList(incomeQuery: ParseQuery): Promise<Division[]> {
        const searchOpt = new ParseQuery(incomeQuery, Object.keys(new Division()));
        console.log(incomeQuery);

        // const query = this.repo
        //     .createQueryBuilder('divis')
        //     .skip(searchOpt.start)
        //     .take(searchOpt.limit)
        //     .where('divis.name LIKE :name', { name: `%${searchOpt.search}%` })
        //     .orderBy({[searchOpt.sort]: searchOpt.order})
        //     .getMany();

        const query = this.repo.query(`
                SELECT id, name, parent_id FROM dbo.division
            `);
        return await query;
    }

    async getDivisionTree(): Promise<Division[]> {
        // первый вариант получения дерева
        // const manager = getManager();
        // const treeCategories = await manager.getTreeRepository(Division).findTrees();

        const treeCategories = await this.repo.findTrees();
        return treeCategories;
    }

    async CreateDivisionTreeItem(createDivisionDto: CreateDivisionDto): Promise<Division> {
        // const divisionParent = await this.repo.findOne(createDivisionDto.parent.id);
        // const division: Division = {
        //     name: createDivisionDto.name,
        //     parent: {
        //         id: (await divisionParent).id,
        //     }
        // }
        return this.repo.save(createDivisionDto);
    }

    async getDivisionById(id: number): Promise<Division> {
        const item = await this.repo.findOne(id);

        if (!item) {
            throw new NotFoundException(`Division with id ${id} not found`);
        }
        console.log(item);
        
        item.parent = await this.repo.findOne(item.parent_id);
        return item;
    }

    async createDivision(createDivisionDto: CreateDivisionDto): Promise<Division> {
        return await this.repo.save(createDivisionDto);
    }

    async updateDivision(id: number, updateDivisionDto: UpdateDivisionDto): Promise<Division> {
        updateDivisionDto.id = id;
        return await this.repo.save(updateDivisionDto);

    }

    async  deleteDivision(id: number): Promise<Division> {
        const delDivision = await this.getDivisionById(id);
        console.log(delDivision);

        if (delDivision.children) {
            throw new NotFoundException(`you cannot delete division with children!`);
        }

        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new DeleteExeption(id);
        }
        return delDivision;
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