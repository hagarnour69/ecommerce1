import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { IBrand } from '../../core/intefaces/ibrand';
import { ISBrand } from '../../core/intefaces/isbrand';
@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit {
  private readonly _brands = inject(BrandsService)
  allBrandsUnsubscribe!: Subscription;
  Brands: IBrand[]=[]
  SBrand:IBrand={} as IBrand
  ngOnInit(): void {
    this.allBrandsUnsubscribe = this._brands.getAllBrands().subscribe(
      {
        next:(res) => {
          console.log(res.data)
          this.Brands = res.data

        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
  getspecificBrand(id: string) {
    this._brands.getSpecificBrand(id).subscribe(
      {
        next: (res) => {
          console.log(res.data)
          this.SBrand=res.data
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.allBrandsUnsubscribe?.unsubscribe

  }


}

