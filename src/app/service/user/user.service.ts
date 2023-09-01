import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken = '';
  public data : any[];
  constructor() {
    this.data = [];
  }
  async login(emailInput: string, passwordInput: string): Promise<string> {
    fetch("https://api.accuropt.com/apt/users/actions/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
    .then( data => {
      console.log(data);
      this.authToken = data.data.token;
      return this.authToken;
    });
    return this.authToken;
  }

  async onSubmit(day: number, month: number, year: number): Promise<any[]> {
    fetch('https://api.accuropt.com/mayweather/workout-of-the-day/'+year+'/'+month+'/'+day, {
      method: "GET",
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then( data => {
      // this.authToken = data.data.token;
      console.log(data.data.sections);
      this.data = data.data.sections;
      return this.data;
    });
    return this.data;
  }
}
