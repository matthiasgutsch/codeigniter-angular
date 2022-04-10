import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class Documents {
    id: number;
    title: string;
    user_id: number;
    description: string;
    description_full: string;
    image: string;
    category_id: string;
    works_id: string;
    location_id: string;
    brand_id: string;
    is_featured: boolean;
    is_active: boolean;
    created_at: Date;
    code: string;
    code_int: string;
    files: string;
    price: string;
    price_extra: string;
    data: JSON;
    status: StringMap;
    skills: ISkill[];
    product_id: string;
    produtct_id: string;
    pieces: string;
}


export interface ISkill{
    qty: string;
    name: string;
    price: number;
    itemTotal: string;
}