import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';

export class Recipe {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ingredients: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(description: string, ingredients: string[], title: string) {
    this.description = description;
    this.ingredients = ingredients;
    this.title = title;
    this.createdAt = new Date();
    this.id = uuid();
    this.updatedAt = null;
  }
}
