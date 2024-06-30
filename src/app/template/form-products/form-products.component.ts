import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {

  url = 'http://localhost:3001';
  id: string = '';

  product = {
    'name': '',
    'price': 0,
    'size': '',
    'color': '',
    'productType': ''
  };

  productTypes: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];

    try {
      this.productTypes = await this.api.getProductTypes();
    } catch (error) {
      console.error('Error al obtener los tipos de productos', error);
    }

    if (this.id) {
      const productById = await this.api.getProductById(parseInt(this.id));
      this.product.name = productById.name;
      this.product.price = productById.price;
      this.product.size = productById.size;
      this.product.color = productById.color;
      this.product.productType = productById.productType;
    } else {
      this.id = '';
    }
  }

  async saveProduct() {
    if (this.id) {
      console.log('update', this.product, this.product.productType);
      await this.api.updateProductById(parseInt(this.id), this.product);
      this.router.navigate(['/list-products']);
    } else {
      try {
        await this.api.createProduct(this.product);
        this.router.navigate(['/list-products']);
      } catch (error) {
        alert('Error al crear el producto');
      }
    }
  }

  cancelarProduct() {
    this.router.navigate(['/list-products']);
  }
}
