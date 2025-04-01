import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.css'
})
export class AllUserComponent implements OnInit {
  userResult:any[]=[];
  private BASE_URL = 'http://localhost:8080';
  p: number =1

  constructor(private fb: FormBuilder, private http: HttpClient){}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get<any>(`${this.BASE_URL}/users`)
      .subscribe(response => {
        this.userResult = response;
      }, error => console.error(error));
  }
  deleteUser(id:any) {
 const  userId=id;
 console.log("delete",userId);
 
    this.http.delete(`${this.BASE_URL}/users/${userId}`)
      .subscribe(() => this.getAllUsers(), error => console.error(error));
      this.getAllUsers();
      }
}