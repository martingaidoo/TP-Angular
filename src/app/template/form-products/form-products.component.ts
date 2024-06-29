import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-form-products',
  standalone: true,
  imports: [],
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css'
})
export class FormProductsComponent implements OnInit {

  url = 'http://localhost:3001';
  id: string='';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    console.log(this.id)
 
    axios.get(`${this.url}/products`+this.id)
  

  }


}
