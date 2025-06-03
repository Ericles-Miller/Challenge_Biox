import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Recipe } from 'src/Domain/entities/recipe.entity';
import { IRecipeRepository } from 'src/Domain/repositories-interface/recipe-repository.interface';

@Injectable()
export class ListAllRecipeUseCase {
  constructor(
    @Inject('IRecipeRepository')
    private readonly repository: IRecipeRepository,
  ) {}

  execute(): Recipe[] {
    const recipes = this.repository.listAll();

    if (recipes.length === 0 || recipes === null)
      throw new BadRequestException('Does not recipes registered');

    return recipes;
  }
}
