import { IsUUID } from 'class-validator';

export class FindProductDto {
  @IsUUID()
  id: string;
}