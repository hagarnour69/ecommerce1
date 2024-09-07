import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import path from 'path';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { BrandComponent } from './components/brand/brand.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent, children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent,title:'login' },
        {path:'register',component:RegisterComponent,title:'register'},
        {path:'forgot',component:ForgetPasswordComponent,title:'forgot passowrd'}
 ] },
    {path:'',component:BlankLayoutComponent,canActivate:[authGuard]
        , children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,title:'home'},
        {path:'cart',component:CartComponent,title:'cart'},
        {path:'product',component:ProductsComponent,title:'products'},
        {path:'categories',component:CategoriesComponent,title:'Categories'},
        {path:'Brand',component:BrandComponent,title:'Brand'},
        {path:'details/:id',component:DetailsComponent,title:'details'},
        {path:'orders/:id',component:OrdersComponent,title:'orders'},
        {path:'allorders',component:AllordersComponent,title:'allorders'},


    ]}
    ,
    {path:'**',component:NotFoundComponent,title:'not found'}
];
