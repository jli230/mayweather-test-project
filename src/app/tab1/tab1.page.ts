import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading = false;
  public listForm : FormGroup;
  public day : number;
  public month : number;
  public year : number;
  public data: any[];
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.day = 1;
    this.month = 1;
    this.year = 2023;
    this.data = [];
    this.listForm = this.formBuilder.group({
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required]
    });
  }
  async onSubmit() {
    this.day = this.listForm.value.day;
    this.month = this.listForm.value.month;
    this.year = this.listForm.value.year;
    // console.log(this.day);
    // fetch('https://api.accuropt.com/mayweather/workout-of-the-day/'+this.year+'/'+this.month+'/'+this.day, {
    //   method: "GET",
    //   headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    // .then(response => response.json())
    // .then( data => {
    //   // this.authToken = data.data.token;
    //   console.log(data.data.sections);
    //   this.data = data.data.sections;
    // });
    this.data = await this.userService.onSubmit(this.day, this.month, this.year);
  }
}
