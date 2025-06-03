import { IRecipeRepository } from 'src/Domain/repositories-interface/recipe-repository.interface';
import { CreateRecipeRequestDto } from '../dtos/request/create-recipe-request.dto';
import { Recipe } from 'src/Domain/entities/recipe.entity';
import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CreateRecipeUseCase {
  constructor(
    @Inject('IRecipeRepository')
    private readonly repository: IRecipeRepository,
  ) {}

  execute({ description, ingredients, title }: CreateRecipeRequestDto): Recipe {
    try {
      const recipe = new Recipe(description, ingredients, title);

      const recipeALreadyExist = this.repository.findByName(title);
      if (recipeALreadyExist) throw new BadRequestException('Title already exists in recipes');

      return this.repository.create(recipe);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Error to create a new recipe');
    }
  }
}
