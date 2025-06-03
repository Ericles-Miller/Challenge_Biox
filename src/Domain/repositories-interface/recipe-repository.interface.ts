import { CreateRecipeRequestDto } from 'src/Application/dtos/request/create-recipe-request.dto';
import { Recipe } from '../entities/recipe.entity';

export interface IRecipeRepository {
  create(data: CreateRecipeRequestDto): Recipe;
  listAll(): Recipe[];
  findById(id: string): Recipe | undefined;
  findByName(title): Recipe | undefined;
}
