import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-products-abm',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule aquí
  templateUrl: './products-abm.component.html',
  styleUrls: ['./products-abm.component.css']
})
export class ProductsABMComponent {
  products: any[] = [];

  constructor(private api: ApiService) {}

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    try {
      this.products = await this.api.getProducts();
      console.log(this.products); // Log products to the console
    } catch (error) {
      console.error(error);
      alert('Error al obtener los productos');
    }
  }
}
