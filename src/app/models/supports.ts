import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class Supports {
    id: number;
    title: string;
    user_id: number;
    description: string;
    description_full: string;
    image: string;
    category_id: string;
    works_id: string;
    location_id: string;
    phone: string;
    name: string;
    ref_id: string;
    email: string;
    brand_id: string;
    is_featured: boolean;
    is_active: boolean;
    created_at: Date;
    code: string;
    code_int: string;
    files: string;
    data: JSON;
    status: StringMap;
    skills: ISkill[];
}


export interface ISkill{
    qty: string;
    price: number;
    itemTotal: string;
}