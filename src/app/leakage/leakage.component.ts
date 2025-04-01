import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-leakage',
  templateUrl: './leakage.component.html',
  styleUrl: './leakage.component.css'
})
export class LeakageComponent {


  leakageForm: FormGroup;
  leakageResult: string = '';
  userResult: any[] = [];

  private BASE_URL = 'http://localhost:8080';
  selectedResult: any;
field: any='';
  searchResult: any[]=[];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.leakageForm = this.fb.group({
      agentId: [''],
      agentName: [''],
      allocatedData: [''],
      alteration: [''],
      leakedData: [''],
      leakedAlteration: ['']
    });
  }
  ngOnInit(): void {
    this.http.get<any>(`${this.BASE_URL}/users`)
      .subscribe(response => {
        this.userResult = response;
        console.log("response", response);
        console.log("id", this.userResult);
      }, error => console.error(error));

  }
  detectLeakage() {
    this.http.post(`${this.BASE_URL}/detect-leakage`, this.leakageForm.value)
      .subscribe(response => {
        this.leakageResult = response as string;
      }, error => console.error(error));
  }
  getbyIdDetailsByAgent(event: Event) {
    const id = (event.target as HTMLSelectElement).value; // Ensure correct element type
    console.log(id);
    // Find the selected agent by ID
    const selected = this.userResult.find(hu => hu.id == id);
    if (selected) {
      const { username, allocatedData, alterationData } = selected; // Destructure values

      this.leakageForm.patchValue({
        agentName: username || '',
        allocatedData: allocatedData || '',
        alteration: alterationData || '',
        leakedData: '' // Ensure it's initialized
      });
      // Disable the 'agentName' input field
    } else {
      console.warn('No agent found for the given ID');
    }

    console.log(selected);
  }
  searchLeakage() {
    this.http.post<any[]>(`${this.BASE_URL}/users/search`, { field: this.field })
      .subscribe(response => {
        console.log(response);
        this.searchResult = response;
      }, error => console.error(error));
  }

  searchLeakageClear() {
    this.searchResult=[];
    this.field='';
    }
  
}  
