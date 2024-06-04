import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cocktail} from 'src/app/shared/interfaces/cocktail.interface';
import {PanierService} from "../../../../shared/services/panier.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {CocktailService} from "../../../../shared/services/cocktail.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss'],
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {
  public cocktail: Cocktail;
  private subscription: Subscription;

  constructor(private panierService: PanierService,
              private activatedRoute: ActivatedRoute,
              private cocktailService: CocktailService) {
    this.subscription = this.cocktailService.getCocktail(+this.activatedRoute.snapshot.paramMap.get("index")!)
      .subscribe((cocktail: Cocktail) => {
        this.cocktail = cocktail;
      })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.cocktailService.getCocktail(+paramMap.get("index")!)
        .subscribe((cocktail: Cocktail) => {
          this.cocktail = cocktail;
        })
    })
  }

  public addToPanier() {
    this.panierService.addPanier(this.cocktail.ingredients);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
