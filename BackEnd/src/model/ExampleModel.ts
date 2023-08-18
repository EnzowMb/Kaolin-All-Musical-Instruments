export class ExampleModel {
  constructor(private name: string) {
    this.name = name;
  }

  sayHello() {
    return 'hello world!';
  }

  sayVasco(name: string) {
    return `${name} torce pro vasco`;
  }
}
