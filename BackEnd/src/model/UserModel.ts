export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
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
