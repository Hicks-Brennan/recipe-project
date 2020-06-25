import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService { 
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Bean Chili Burrito', 
            'Yummy Evening Snack', 
            'https://i2.wp.com/recipegirl.com/wp-content/uploads/2018/05/Beef-Burrito-Casserole-1.jpg',
            [
                new Ingredient('Chili with Beans', 1),
                new Ingredient('Frozen Burritos', 4)
            ]),
        new Recipe(
            'Cheeseburger', 
            'Burger with Cheese', 
            'https://tasteandsee.com/wp-content/uploads/2017/06/Easy-Pimento-Cheese-and-Bacon-Burger-EL-burger-great.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
                new Ingredient('Cheese', 1)
            ])
      ];

      constructor(private slService: ShoppingListService) {}


      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index:number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients) {
            this.slService.addIngredients(ingredients)
      }

      addRecipe(recipe: Recipe) {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice())
      }

      updateRecipe(index: number, newRecipe: Recipe) {
          this.recipes[index] = newRecipe;
          this.recipesChanged.next(this.recipes.slice())
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice())
      }
    
}