import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipeUseCase } from './create-recipe.useCase';
import { Recipe } from 'src/Domain/entities/recipe.entity';
import { BadRequestException } from '@nestjs/common';
import { IRecipeRepository } from 'src/Domain/repositories-interface/recipe-repository.interface';

describe('CreateRecipeUseCase', () => {
  let useCase: CreateRecipeUseCase;
  let mockRepository: jest.Mocked<IRecipeRepository>;

  const recipe = new Recipe('description field', ['ingredient1', 'ingredient2'], 'title recipe');

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      findByName: jest.fn(),
      findById: jest.fn(),
      listAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateRecipeUseCase,
        {
          provide: 'IRecipeRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateRecipeUseCase>(CreateRecipeUseCase);
  });

  it('should create a recipe successfully', () => {
    const recipeData = {
      title: 'Test Recipe',
      description: 'Test Description',
      ingredients: ['ingredient1', 'ingredient2'],
    };

    mockRepository.findByName.mockReturnValue(undefined);
    mockRepository.create.mockReturnValue(recipe);

    const result = useCase.execute(recipeData);

    expect(result.description).toEqual(recipe.description);
    expect(result.ingredients).toEqual(recipe.ingredients);
    expect(mockRepository.findByName).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw BadRequestException when recipe title already exists', () => {
    const recipeData = {
      title: 'Existing Recipe',
      description: 'Test Description',
      ingredients: ['ingredient1', 'ingredient2'],
    };

    mockRepository.findByName.mockReturnValue(recipe);

    expect(() => useCase.execute(recipeData)).toThrow(BadRequestException);
    expect(mockRepository.findByName).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveBeenCalledTimes(0);
  });
});
