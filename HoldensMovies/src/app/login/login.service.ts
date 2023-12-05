import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    return this.http.get(`http://localhost:8001/api/Users/login`,
      {params: {username, password}, observe: 'body', responseType: 'text'})
  }
}
