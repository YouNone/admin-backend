import { InjectRepository } from '@nestjs/typeorm';
import { ParseQuery } from './../share/parse.query';
import { Scale } from './scale.entity';
import { DeleteExeption } from './../share/errorhandlers/deleteExeption';
import { NotFoundException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateScaleDto } from './dto/create-scale.dto';
import { UpdateScaleDto } from './dto/update-scale.dto';

@Injectable()
export class ScaleService {
    constructor(
        @InjectRepository(Scale) private repo: Repository<Scale>
    ) { }

    async getScalesList(incomeQuery: ParseQuery): Promise<Scale[]> {
        const searchOpt = new ParseQuery(incomeQuery, Object.keys(new Scale()));
        console.log(incomeQuery);
        const query = this.repo
            .createQueryBuilder('scl')
            .skip(searchOpt.start)
            .take(searchOpt.limit)
            .where('scl.name LIKE :name OR scl.code LIKE :name', { name: `%${searchOpt.search}%` })
            .orderBy({ [searchOpt.sort]: searchOpt.order })
            .getMany();
        return await query;
    }

    async getScaleById(id: number): Promise<Scale> {
        const found = this.repo.findOne(id);
        if (!found) {
            throw new NotFoundException(`Scale with id ${id} not found`);
        }
        return found;
    }

    async createScale(createScaleDto: CreateScaleDto): Promise<Scale> {
        // createScaleDto.scale = JSON.stringify(createScaleDto.scale);
        console.log(createScaleDto);
        return await this.repo.save(createScaleDto);
    }

    async updateScale(id: number, updateScaleDto: UpdateScaleDto): Promise<Scale> {
        updateScaleDto.id = id;
        return await this.repo.save(updateScaleDto);
    }

    async  deleteScale(id: number): Promise<void> {
        const result = await this.repo.delete(id);
        if (result.affected === 0) {
            throw new DeleteExeption(id);
        }
    }
}