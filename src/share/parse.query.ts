import { IrequestParams, ESort } from "./type";

export class ParseQuery implements IrequestParams {
    start: number;
    limit: number;
    sort: ESort;
    order_field: string;
    search: string;

    constructor(params: IrequestParams = <IrequestParams>{}, fields: string[], defaultFieldName = 'name') {
        this.start = Number(params.start) || 0;
        this.limit = Number(params.limit) || 20;
        this.sort = params.sort || ESort.asc;
        this.search = params.search || "";

        this.order_field = params.order_field && fields.includes(params.order_field) ? params.order_field : defaultFieldName;

        // if(params.order_field) {
        //     const field_name = params.order_field.toLowerCase();
        //     this.order_field = fields.includes(field_name) ? field_name : defaultFieldName;
        // } 

        // else {
        //     this.order_field = defaultFieldName;
        // }

        // if (params.search) {
        //     this.search.trim();
        // }

    }
} 