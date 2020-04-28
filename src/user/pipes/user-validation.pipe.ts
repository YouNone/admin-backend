import { PipeTransform } from "@nestjs/common";

export class UserUpdateValidationPipe implements PipeTransform {
    transform(value) {
        // console.log(value);
    }
}