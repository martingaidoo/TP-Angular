import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-form-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit {

  url = 'http://localhost:3001';
  id: string='';

  product = {
    'name': '',
    'price': 0,
    'size': '',
    'color': '',
  }

  constructor(private route: ActivatedRoute, private router: Router, private api:ApiService) { }

  async ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
 
    // si es editar, traigo el producto por id
    if (this.id) {
      const productById = await this.api.getProductById(parseInt(this.id));
      console.log(productById)
      console.log(productById.id)
      this.product.name = productById.name;
      this.product.price = productById.price;
      this.product.size = productById.size;
      this.product.color = productById.color
    }

  }

  async saveProduct() {
    console.log(this.product)
    if (this.id) {
      this.api.updateProductById(parseInt(this.id), this.product)
      this.router.navigate(['/list-products']);
    }else{
      try{
        this.api.createProduct(this.product);
        this.router.navigate(['/list-products']);
      } catch (error) {
        alert('Error al crear el producto');
      }
    }

  }

  async cancelarProduct() {
    // cancelo y vuelvo al listado de productos
    this.router.navigate(['/list-products']);
  }
}
