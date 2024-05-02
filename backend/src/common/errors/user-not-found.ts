export class UserNotFoundError extends Error {
  public constructor() {
    super(UserNotFoundError.name);
  }
}
