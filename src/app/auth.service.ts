import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoginI, RegisterI, TokenI } from './interfaces/token';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import  moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';

  constructor() {}

  async login(body: LoginI): Promise<TokenI> {
    try {
      const response = (await axios.post(`${this.url}/login`, body)).data;
      localStorage.setItem('token', JSON.stringify(response));
      const time = moment(response.expirationTime).diff(moment());
      timer(time*0.5).subscribe(async () => {
        await this.refreshToken();
      });
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

  async refreshToken() {
    const tokenObject:{refreshToken:string,accessToken:string}=JSON.parse(localStorage.getItem('token')??"{refreshToken:''}")
    const response = (
      await axios.get(`${this.url}/refresh-token`, {
        headers: {
          'refresh-token': tokenObject.refreshToken
        },
      })
    ).data;
    tokenObject.accessToken = response.accessToken
    localStorage.setItem('token', JSON.stringify(tokenObject));
  }
  logout(): void {
    localStorage.removeItem('token')
  }
}
