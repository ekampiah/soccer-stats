export class APIResponse<T> {
  constructor(public response: T) {
    this.response = response;
  }
}