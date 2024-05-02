import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidPassword } from '../../../common/decorators/validators/password';

export class RegisterInputDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsValidPassword()
  password: string;
}
