import { IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  link: string;
}
