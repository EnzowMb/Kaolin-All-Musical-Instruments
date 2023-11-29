export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private id?: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}
