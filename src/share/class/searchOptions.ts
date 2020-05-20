import { ISearchOptions } from './../type';
export class SearchOptions implements ISearchOptions {
	start: number;
	limit: number;
	sort: string;
	order?: 'ASC' | 'DESC';
	f?: string;
	field?: string;
	f2?: string;
	field2?: string;

	constructor(options: ISearchOptions = <ISearchOptions>{}, fieldList: string[], entityName = '', defaultFieldName = 'name') {
		this.start = options.start || 0;
		this.limit = options.limit || 50;
		this.sort = options.sort && fieldList.includes(options.sort) ? options.sort : defaultFieldName;
		if(entityName) this.sort = [entityName, this.sort].join('.');
		this.order = options.order && ['ASC', 'DESC'].indexOf(options.order.toString().toUpperCase()) !== -1 
					 ? options.order 
					 : 'ASC';
		this.f = options.f && options.f.trim() ? options.f.trim() : '';
		if (options.f2 && options.field2) {
			this.f2 = options.f2.trim();
			this.field2 = options.field2.trim();
		}
	}

	
	/**
	 * Создает объект option для функции find репозитория.
	 * Если строка поиска задана, то её содержимым заполняем поле where с оператором LIKE.
	 * Подходит только для простых условий. 
	 *
	 * @param {...string[]} searchFields
	 * @memberof SearchOptions
	 */
	public getSearchOptions(...searchFields: string[]){
		let res = {
			skip: this.start,
			take: this.limit,
			order: {[this.sort]: this.order},
			where: []
		};

		if(this.f) {
			searchFields.forEach( (field: string) => {
				res.where.push({[field]: `%${this.f}%`});
			});
		}
	}

	public getQueryBuilderSearchStr(varName: string, ...fieldNames: string[]): string {
		const conditions = fieldNames.map( (field: string) => `${field} LIKE :${varName}`)
		return conditions.join(" OR ");
	}
}

