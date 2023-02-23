import { IsMongoId, IsString, MaxLength } from 'class-validator';

export class CreateProjectCollectionDto {
  @IsString()
  name: string;

  @MaxLength(20, {
    each: true,
  })
  @IsString({ each: true })
  tags: string[];

  @IsMongoId({ each: true })
  project: string[];
}
