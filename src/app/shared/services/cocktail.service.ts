import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Cocktail} from "../interfaces/cocktail.interface";

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  public cocktails$: BehaviorSubject<Cocktail[]> = new BehaviorSubject([
    {
      name: 'Mojito',
      img: 'https://maisonfoody.com/sites/default/files/styles/article_paragraph_image/public/2020-08/articles-images-corps-texte-8.png?itok=tDVVevZ-',
      description:
        'Il est sans conteste le cocktail préféré des français et probablement l’un des plus faciles à réaliser. Le Mojito, traditionnellement composé de 4 à 6 cl de rhum blanc, d’eau gazeuse, de 3 cuillères à café de sucre de canne, d’1/2 citron vert, de glaçons et de feuilles de menthe, peut aussi se dévergonder avec du jus de fraise par exemple ! Il se mariera à la perfection avec un délicieux guacamole au piment doux.',
      ingredients:[
        {
          name:'mouscade',
          quantity: 1
        },
        {
          name:'menthe',
          quantity: 2
        },
        {
          name:'sucre',
          quantity: 2
        }
      ]
    },
    {
      name: 'La Sangria',
      img: 'https://maisonfoody.com/sites/default/files/styles/article_paragraph_image/public/2019-11/sangria.jpg?itok=LjVLCYpj',
      description:
        'Offrez à vos invités un petit détour par l’Espagne avec une Sangria rouge (il existe également des versions blanches et rose). Pour un pichet de 6 personnes, mélangez 1l de vin rouge, 25cl de limonade, 20cl de jus d’orange, 10cl de Cointreau ainsi que deux oranges et un citron jaune coupés en tranches. Ajoutez une gousse de vanille, 50g de sucre en poudre et ½ cuillère à café de cannelle moulue. Et si pour aller un peu plus loin dans le thème vous proposiez à vos invités quelques tranches de jambon Serrano ?',
      ingredients:[
        {
          name:'citron',
          quantity: 1
        },
        {
          name:'menthe',
          quantity: 2
        },
        {
          name:'sucre',
          quantity: 1
        },
      ]
    },
    {
      name: 'Rob Boy',
      img: 'https://maisonfoody.com/sites/default/files/styles/article_paragraph_image/public/2019-11/rob-roy.jpg?itok=GJdkswxs',
      description:
        'Avec le Rob Roy c’est direction l’Ecosse illico ! Ce mélange de 5cl de Whisky, de 1,5cl de Vermouth blanc et de 4 traits d’Angostura Bitters fera des merveilles associé à quelques brochettes de saumon d’Ecosse et concombre.',
      ingredients:[
        {
          name:'abricot',
          quantity: 3
        },
        {
          name:'vanille',
          quantity: 2
        },
        {
          name:'perrier',
          quantity: 1
        },
      ]
    },
  ]);

  public selectedCocktail$: BehaviorSubject<Cocktail> = new BehaviorSubject(
    this.cocktails$.value[0]
  );

  constructor() {
    //this.selectedCocktail$= this.cocktails$.value[0];
  }

  public selectCocktail(index: number): void {
    this.selectedCocktail$.next(this.cocktails$.value[index]);
  }
}
