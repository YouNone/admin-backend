import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDivisionDto } from './dto/create.division.dto';
import { Division } from './division.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDivisionDto } from './dto/update.division.dto';
import { DivisionFilterDto } from './dto/division.filter.dto';

@Injectable()
export class DivisionService {
    constructor(
        @InjectRepository(Division) private divisionRepository: Repository<Division>
    ) { }

    async getDivisionsList(filterDto: DivisionFilterDto): Promise<Division[]> {
        const { search, name } = filterDto;
        const query = this.divisionRepository.createQueryBuilder('Division');

        if (filterDto.name) {
            query.andWhere('division.name = :name', { name });
        }

        if (filterDto.search) {
            query.andWhere(
                `(
                OR division.date_create LIKE :search
                OR division.date_modify LIKE :search
                )`,
                { search: `%${search}%` }
            );
        }

        const divisions = query.getMany();
        return divisions;
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
