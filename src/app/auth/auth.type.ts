export class User {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  createdAt: Date;
  updateAt: Date;
  lang: string;

  toString(): string {
    const ret: string[] = [];
    if (this.firstName || this.lastName) {
      this.firstName && ret.push(this.firstName);
      this.lastName && ret.push(this.lastName);
    } else {
      ret.push(this.username);
    }
    return ret.join(" ");
  }
}

export class Tokens {
  accessToken: string;
  refreshToken: string | null;
}
