import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  userResult: any;

  private BASE_URL = 'http://localhost:8080';
  typeResult: any[] = [];
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      userId: [''],
      username: ['',Validators.required],
      allocatedData: ['',Validators.required],
      alterationData: ['',Validators.required],
      email: ['',Validators.required]
    });

  }
  ngOnInit(): void {
    this.getAllTypes();
  }
  createUser() {
    if(this.userForm.valid){
      this.http.post(`${this.BASE_URL}/users`, this.userForm.value)
      .subscribe(() => this.getAllUsers(), error => console.error(error));
    location.reload();
    }
    else{
      this.userForm.invalid;
      
    }
  }
  updateUser() {
    const userId = this.userForm.value.userId;
    this.http.put(`${this.BASE_URL}/users/${userId}`, this.userForm.value)
      .subscribe(() => this.getAllUsers(), error => console.error(error));
  }
  getAllUsers() {
    this.http.get(`${this.BASE_URL}/users`)
      .subscribe(response => {
        this.userResult = response;
      }, error => console.error(error));
  }

  getAllTypes() {
    this.http.get<any[]>(`${this.BASE_URL}/users/getAllEntities`)
      .subscribe(response => {
        this.typeResult = response;
        console.log(this.typeResult);

      }, error => console.error(error));
  }
} 