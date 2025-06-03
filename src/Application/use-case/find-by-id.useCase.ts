import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Recipe } from 'src/Domain/entities/recipe.entity';
import { IRecipeRepository } from 'src/Domain/repositories-interface/recipe-repository.interface';

@Injectable()
export class FindByIdRecipesUseCase {
  constructor(
    @Inject('IRecipeRepository')
    private readonly repository: IRecipeRepository,
  ) {}

  execute(id: string): Recipe {
    const recipe = this.repository.findById(id);

    if (!recipe) throw new BadRequestException('id does not exist');

    return recipe;
  }
}
