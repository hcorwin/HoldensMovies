import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  isLoggedIn(): boolean{
    const token = sessionStorage.getItem('token');
    return !!token;
  }
}
