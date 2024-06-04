import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../../../shared/interfaces/ingredient.interface";
import {CocktailService} from "../../../../shared/services/cocktail.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Cocktail} from "../../../../shared/interfaces/cocktail.interface";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.scss']
})
export class CocktailFormComponent implements OnInit {

  private cocktail: Cocktail;

  constructor(private formBuilder: FormBuilder,
              private cocktailService: CocktailService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const index = paramMap.get("index");
      if (index !== null) {
        this.cocktailService.getCocktail(+index)
          .pipe(
            first((x) => !!x)
          )
          .subscribe((cocktail: Cocktail) => {
            this.cocktail = cocktail;
          });
        this.cocktailForm = this.initForm(this.cocktail);
      } else {
        this.cocktailForm = this.initForm(this.cocktail);
      }
    })
  }

  public get ingredients() {
    return this.cocktailForm.get("ingredients") as FormArray;
  }

  private initForm(cocktail: Cocktail = {name: '', img: '', description: '', ingredients: []}): FormGroup {
    return this.formBuilder.group({
      name: [cocktail.name, Validators.required],
      img: [cocktail.img, Validators.required],
      description: [cocktail.description, Validators.required],
      ingredients: this.formBuilder.array(cocktail.ingredients.map((ingredient: Ingredient) =>
        this.formBuilder.group({
          name: [ingredient.name, Validators.required],
          quantity: [ingredient.quantity, Validators.required]
        })
      ))
    })
  }

  public cocktailForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    img: ['', Validators.required],
    description: ['', Validators.required],
    ingredients: this.formBuilder.array([], Validators.required)
  })

  public addIngredient(): void {
    this.ingredients.push(this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required]
    }))
  }

  public submit(): void {
    if (this.cocktail) {
      this.cocktailService.editerCocktail(this.cocktail._id, this.cocktailForm.value).subscribe();
    } else {
      this.cocktailService.addCocktail(this.cocktailForm.value).subscribe();
      this.cocktailForm.reset();
    }
    this.router.navigate([".."], {relativeTo: this.activatedRoute})
  }
}
