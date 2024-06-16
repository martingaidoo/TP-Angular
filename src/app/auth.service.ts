import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoginI, RegisterI, TokenI } from './interfaces/token';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';

  constructor() {}

  async login(body: LoginI): Promise<TokenI> {
    try {
      console.log("estoooooooo")
      console.log(this.url)
      console.log(body)
      const response = (await axios.post(`${this.url}/login`, body)).data;
      localStorage.setItem('token', JSON.stringify(response));
      return response;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }

  async register(body: RegisterI): Promise<void> {
    try {
      return (await axios.post(`${this.url}/register`, body)).data;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }
  logout(): void {
    localStorage.removeItem('token')
  }
}
