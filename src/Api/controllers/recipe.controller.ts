import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRecipeRequestDto } from 'src/Application/dtos/request/create-recipe-request.dto';
import { CreateRecipeUseCase } from 'src/Application/use-case/create-recipe.useCase';
import { FindByIdRecipesUseCase } from 'src/Application/use-case/find-by-id.useCase';
import { ListAllRecipeUseCase } from 'src/Application/use-case/list-all-recipe.useCase';
import { Recipe } from 'src/Domain/entities/recipe.entity';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly listAllRecipeUseCase: ListAllRecipeUseCase,
    private readonly findByIdRecipeUseCase: FindByIdRecipesUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'create a new recipe',
    description: `
    sample request: 
    POST /recipes
    REQUEST BODY:
    {
      "description": "description recipe",
      "title": "title recipe",
      "ingredients": ['first ingredient', 'second ingredient']
    }
    `,
  })
  @ApiResponse({
    status: 201,
    type: Recipe,
    description: 'Create recipe successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  create(@Body() data: CreateRecipeRequestDto): Recipe {
    return this.createRecipeUseCase.execute(data);
  }

  @Get()
  @ApiOperation({
    summary: 'list all recipes registered in application',
    description: `
    sample request: 
    GET /recipes
    `,
  })
  @ApiResponse({
    status: 200,
    type: [Recipe],
    description: 'list all recipes successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  listAll(): Recipe[] {
    return this.listAllRecipeUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'list recipe by id registered in application',
    description: `
    sample request: 
    GET /recipes/daf5ec64-eecc-45dd-a48c-f78ad069bc1d
    `,
  })
  @ApiResponse({
    status: 200,
    type: Recipe,
    description: 'list recipes by id successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  findById(@Param('id') id: string): Recipe {
    return this.findByIdRecipeUseCase.execute(id);
  }
}
