import * as PasswordValidator from 'password-validator';

const schema = new PasswordValidator();
export const passwordSchema = schema
  .is()
  .min(8)
  .is()
  .max(200)
  .has()
  .letters()
  .has()
  .symbols()
  .has()
  .digits()
  .has()
  .not()
  .spaces();
