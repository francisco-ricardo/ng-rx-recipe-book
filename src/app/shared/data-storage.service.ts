import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from '@angular/common/http';

//import { map } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {
  Recipe
} from './../recipes/recipe.model';
import {
  RecipeService
} from '../recipes/recipe.service';
import {
  AuthService
} from './../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}


  public storeRecipes() {
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-1a4f7.firebaseio.com/recipes.json', 
      this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);

//    return this.httpClient.put('https://ng-recipe-book-1a4f7.firebaseio.com/recipes.json',
//      this.recipeService.getRecipes(), {
//        observe: 'body',
//        params: new HttpParams().set('auth', token),
//      });
  }

  getRecipes() {
    const token = this.authService.getToken();


    this.httpClient.get <Recipe[]> ('https://ng-recipe-book-1a4f7.firebaseio.com/recipes.json?auth=' + token, {
        observe: 'body',
        responseType: 'json'
      })
      .map(
        (recipes) => {
          //console.log(recipe);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }


}
