export class UserAlreadyExistsError extends Error {
  public constructor() {
    super(UserAlreadyExistsError.name);
  }
}
