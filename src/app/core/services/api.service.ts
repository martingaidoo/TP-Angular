import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:3001';

  constructor() {}

  // Método para obtener el token almacenado en el localStorage
  private getAccessToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const parsedToken = JSON.parse(token);
      return parsedToken.accessToken || null;
    }
    return null;
  }

  // Método para obtener productos con autenticación
  async getProducts(): Promise<any> {
    try {
      const accessToken = this.getAccessToken();
      console.log(accessToken);
      if (!accessToken) {
        throw new HttpErrorResponse({
          error: 'No access token found',
          status: 401,
          statusText: 'Unauthorized'
        });
      }
      return (await axios.get(`${this.url}/products`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })).data;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }
}