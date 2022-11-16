
export class User {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
  lang: string;
}

export class Tokens {
  accessToken: string;
  refreshToken: string | null;
}
