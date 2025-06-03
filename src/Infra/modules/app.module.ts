import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe.module';

@Module({
  imports: [RecipeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
