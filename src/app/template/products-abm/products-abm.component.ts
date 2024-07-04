import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-products-abm',
  standalone: true,
  imports: [FormsModule, CommonModule], // Agrega CommonModule aquí
  templateUrl: './products-abm.component.html',
  styleUrls: ['./products-abm.component.css']
})
export class ProductsABMComponent {
  products: any[] = [];
  selectedProduct: any = null;
  productTypes: any[] = [];
  productBrand: any[] = [];

  selectType: any = "";
  selectBrand: any = "";
  min: any = null;
  max: any = null;


  constructor(private api: ApiService, private router: Router) {}


  async ngOnInit() {
    await this.getProducts();
    try {
      this.productTypes = await this.api.getProductTypes();
    } catch (error) {
      console.error('Error al obtener los tipos de productos', error);
    }

    try {
      this.productBrand = await this.api.getBrands();
    } catch (error) {
      console.error('Error al obtener los tipos de productos', error);
    }
  }

  async getProducts() {
    try {
      this.products = await this.api.getProducts();
    } catch (error) {
      alert('Error al obtener los productos');
    }
  }

  async getProductByFilter() {
    try {
      this.products = await this.api.getProductByFilter(this.selectType, this.selectBrand, this.min, this.max);
    } catch (error) {
      alert('Error al obtener los productos');
    }
  }

  

  async updateProductById(product?: any) {
    if (product) {
      this.router.navigate(['/form-products'], { queryParams: { id: product.id } });
    }else{
      this.router.navigate(['/form-products']);
    }
  }
  
  async deleteProductById(id: number) {
    try {
      await this.api.deleteProductById(id);
      await this.getProducts();
    } catch (error) {
      alert('Error al eliminar el producto');
    }    
  }

}
