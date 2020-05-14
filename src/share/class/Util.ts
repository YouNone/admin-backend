import { IUniversalTreeNode } from './../type';

export class Util {
    static listToTree(list: IUniversalTreeNode[]): IUniversalTreeNode[] {
		let map = {},
			roots: IUniversalTreeNode[] = [];

		list.forEach((item, i) => {
			map[item.id] = i;
			item.children = [];
		});

		list.forEach((item, i) => {
			if (item.parent_id) {
				list[map[item.parent_id]].children.push(item);
			} else {
				roots.push(item);
			}
		});
		return roots;
	}
}
