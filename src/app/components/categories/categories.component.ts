import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { SubcategoryComponent } from '../subcategory/subcategory.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SubcategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoryname!:string
  private readonly _categoeriesService = inject(CategoriesService)
  allCategoriesUnsubscribe!: Subscription;
  categories: Icategory[] = []
  sub:Icategory[]=[]
  ngOnInit(): void {
    this.allCategoriesUnsubscribe = this._categoeriesService.getallcategories().subscribe(
      {
        next: (res) => {
          console.log(res.data)
          this.categories = res.data

        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
  getsubCat(id: string ,name:string ) {
    this._categoeriesService.getSubcategories(id).subscribe(
      {
        next: (res) => {
          console.log(res.data)
          this.categoryname=name;
          this.sub=res.data
          console.log(this.sub)
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.allCategoriesUnsubscribe?.unsubscribe

  }
}
