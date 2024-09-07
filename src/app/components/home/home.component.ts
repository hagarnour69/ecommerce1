import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { subscribe } from 'diagnostics_channel';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,SearchPipe,FormsModule,ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  categoryUnsubscribe!: Subscription;
  text:string=' '
  private readonly _Category = inject(CategoriesService);
  /*interfaces*/
  categories: Icategory[] = [];
  /*slider options */
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:1500,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  mainslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: true
  }
  /*slider option end*/
  ngOnInit(): void {
    /*product subscribe*/
    

    /*category subscribe  */
    this.categoryUnsubscribe = this._Category.getallcategories().subscribe(
      {
        next: (res) => {
          this.categories = res.data
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.categoryUnsubscribe?.unsubscribe();
  }
}




