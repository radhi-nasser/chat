import { ValidationOptions, registerDecorator } from 'class-validator';
import { UserNewPasswordInvalidError } from '../../errors/user-new-password-invalid';
import { passwordSchema } from '../../helpers/password';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName,
      options: {
        message: () => {
          throw new UserNewPasswordInvalidError();
        },
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          return passwordSchema.validate(value) as boolean;
        },
      },
    });
  };
}
