import { IrequestParams, ESort } from "./type";

export class ParseQuery implements IrequestParams {
    start: number;
    limit: number;
    sort: string;
    order: ESort;
    // order_field: string;
    search: string;

    constructor(params: IrequestParams = <IrequestParams>{}, fields: string[], defaultFieldName = 'name') {
        this.start = Number(params.start) || 0;
        this.limit = Number(params.limit) || 20;
        this.order = params.order || ESort.asc;
        this.search = params.search || "";
        this.sort = params.sort && fields.includes(params.sort) ? params.sort : defaultFieldName;
        // this.order_field = params.order_field && fields.includes(params.order_field) ? params.order_field : defaultFieldName;

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