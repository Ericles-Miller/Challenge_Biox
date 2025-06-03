import { Module } from '@nestjs/common';
import { RecipeController } from 'src/Api/controllers/recipe.controller';
import { CreateRecipeUseCase } from 'src/Application/use-case/create-recipe.useCase';
import { FindByIdRecipesUseCase } from 'src/Application/use-case/find-by-id.useCase';
import { ListAllRecipeUseCase } from 'src/Application/use-case/list-all-recipe.useCase';
import { RecipeRepository } from '../repositories/recipe.repository';

@Module({
  imports: [],
  providers: [
    CreateRecipeUseCase,
    ListAllRecipeUseCase,
    FindByIdRecipesUseCase,
    {
      provide: 'IRecipeRepository',
      useClass: RecipeRepository,
    },
  ],
  controllers: [RecipeController],
})
export class RecipeModule {}
