import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class WarehouseCheckins {
    id: number;
    title: string;
    user_id: number;
    description: string;
    description_full: string;
    image: string;
    category_id: string;
    date_from: string;
    date_to: string;
    works_id: string;
    location_id: string;
    employee_id: string;
    is_featured: boolean;
    is_active: boolean;
    created_at: Date;
    code: string;
    code_int: string;
    pieces: string;
    boxes: string;
    files: string;
    price: string;
    price_extra: string;
    data: JSON;
    product_id: string;
    warehouse_id: string;
    supplier_id: string;
    status: StringMap;
    skills: ISkill[];
}


export interface ISkill{
    qty: string;
    price: number;
    itemTotal: string;
}