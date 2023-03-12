import { Type } from "class-transformer";

export class Comuni {
  id: number;
  name: string;
  @Type(() => Date)
  created_at: Date;
  @Type(() => Date)
  update_at: Date;
}
