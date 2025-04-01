import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeakageComponent } from './leakage/leakage.component';
import { UserComponent } from './user/user.component';
import { AllUserComponent } from './all-user/all-user.component';

const routes: Routes = [
  { path: "leakage", component:LeakageComponent},
  { path: "", component:UserComponent },
  {path:"all-User",component:AllUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
