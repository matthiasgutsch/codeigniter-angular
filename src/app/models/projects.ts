
export class Projects {
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
    code: any;
    code_int: string;
    files: string;
    price: string;
    price_extra: string;
    data: JSON;
    date_from: string;
    date_to: string;
    status: string;
    client_id: string;
    employee_id: string;
    skills: ISkill[];
}


export interface ISkill{
    qty: string;
    price: number;
    itemTotal: string;
}