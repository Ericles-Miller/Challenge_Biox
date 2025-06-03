import { Recipe } from 'src/Domain/entities/recipe.entity';
import { IRecipeRepository } from 'src/Domain/repositories-interface/recipe-repository.interface';

export class RecipeRepository implements IRecipeRepository {
  private readonly recipes: Recipe[] = [];

  create(data: Recipe): Recipe {
    this.recipes.push(data);
    return data;
  }

  listAll(): Recipe[] {
    return this.recipes;
  }

  findById(id: string): Recipe | undefined {
    return this.recipes.find((x) => x.id === id);
  }

  findByName(title): Recipe | undefined {
    return this.recipes.find((x) => x.title === title);
  }
}
