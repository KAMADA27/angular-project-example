import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;
  recipeSub: Subscription;

  constructor() { }

  ngOnInit() { }
}
