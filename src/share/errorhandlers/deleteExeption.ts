import { NotFoundException } from "@nestjs/common";

export class DeleteExeption extends NotFoundException {
	constructor(id: number, errorCode?: string) {
		super(`Item with id = ${id} not deleted`, errorCode);
	}
}
