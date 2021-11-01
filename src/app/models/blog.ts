import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class Blog {
    id: number;
    title: string;
    user_id: number;
    description: string;
    image: string;
    category_id: string;
    is_featured: boolean;
    is_active: boolean;
    created_at: Date;
    date: string;
    skills: ISkill[];

}

export interface ISkill{
    qty: string;
    price: number;
    itemTotal: string;
}