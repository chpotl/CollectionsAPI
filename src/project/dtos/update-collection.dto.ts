import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProjectCollectionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @MaxLength(20, { each: true })
  @MinLength(2, { each: true })
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  project: string[];
}
