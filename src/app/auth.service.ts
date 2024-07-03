import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoginI, RegisterI, TokenI } from './interfaces/token';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000';

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

  async login(body: LoginI): Promise<TokenI> {
    try {
      const response = (await axios.post(`${this.url}/login`, body)).data;
      localStorage.setItem('token', JSON.stringify(response));
      
      this.scheduleTokenRefresh(response.expirationTime); //esto es para ejecutar la función de refreshToken

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
    const tokenObject = JSON.parse(localStorage.getItem('token') ?? '{"refreshToken":""}');

    try {
      const response = (
        await axios.get(`${this.url}/refresh`, {
          headers: {
            'refresh-token': tokenObject.refreshToken,
          },
        })
      ).data;
      tokenObject.accessToken = response.accessToken;
      tokenObject.expirationTime = response.expirationTime;

      localStorage.setItem('token', JSON.stringify(tokenObject));
      
      // Schedule the next token refresh
      this.scheduleTokenRefresh(response.expirationTime); // ejecuta la funcion del refresh token para iniciar un nuevo ciclo
    } catch (error) {
      console.error('Error refreshing token', error);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private scheduleTokenRefresh(expirationTime: string): void {
    const currentTime = moment();
    const expirationMoment = moment(expirationTime);
    const timeToExpire = expirationMoment.diff(currentTime);

    if (timeToExpire > 0) {
      const refreshTime = timeToExpire * 0.5; // Se cambia a 0.5 para refrescar a mitad del tiempo
      timer(refreshTime).subscribe(async () => {
        await this.refreshToken();
      });
    } else {
      console.error('Expiration time is in the past');
    }
  }

  //es cuando se inicia la aplicación o recarga la pagina
  public initializeTokenRefresh(): void { 
    const tokenString = localStorage.getItem('token'); //obtiene el token del local storage
    if (tokenString) {
      const tokenObject = JSON.parse(tokenString) as TokenI; //lo transforma a objeto
      const expirationTime = tokenObject.expirationTime; //consigue el tiempo de expiración
      if (expirationTime) {
        this.scheduleTokenRefresh(expirationTime); //ejecuta la función de del ciclo de refreshToken
      }
    }
  }

  async validateToken(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.url}/users/validateToken`, {
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
      });
      return response.data;
    } catch (error) {
      throw new HttpErrorResponse({ error });
    }
  }

}
