import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { DsoAdminDashboardComponent } from './dsoComponets/dso-admin-dashboard/dso-admin-dashboard.component';
import { RoleEnum } from './models/RoleEnum';
import { ProsumerFirstTimeLoggedComponent } from './prossumerComponets/prosumer-first-time-logged/prosumer-first-time-logged.component';
import { AuthGuard } from './services/guardServices/auth.guard';
import { LoginRegisterGuard } from './services/guardServices/login-register.guard';
import { RoleGuard } from './services/guardServices/role.guard';
import { ProssumerEditProfileComponent } from './prossumerComponets/prossumer-edit-profile/prossumer-edit-profile.component';
import { ProsumerDevicesComponent } from './prossumerComponets/prosumer-devices/prosumer-devices.component';
import { DsoMapComponent } from './dsoComponets/dso-map/dso-map.component';
import { ProsumerDeviceDetailsComponent } from './prossumerComponets/prosumer-device-details/prosumer-device-details.component';
import { DsoProsumersTable } from './dsoComponets/dso-prosumers-table/dso-prosumers-table.component';
import { WeatherWidgetMainComponent } from './dsoComponets/weather/weather.component';
import { CreateUserComponent } from './utils/modals/dsoModals/create-user/create-user.component';
import { ProsumerEnergyComponent } from './prossumerComponets/prosumer-energy/prosumer-energy.component';
import { CreateDsoComponent } from './utils/modals/create-dso/create-dso.component';
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RoleGuard.rolesRederectTo("home", RoleEnum.Admin, RoleEnum.Prosummer)]},
  { path: 'dso/home', component: DsoAdminDashboardComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Admin)]},
  // { path: 'dso/dashboard', component: DsoAdminDashboardComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Admin)]},
  { path: 'dso/map', component: DsoMapComponent,  canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Admin)]},
  //{path: 'dso/dashboard/map', component: DsoProsumersTable,  canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Admin)]},
  //{path: 'dso/dashboard/map', component: WeatherWidgetMainComponent,  canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Admin)]},
  {path: 'dso/add_prosumer', component: CreateUserComponent,  canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Admin)]},
  {path: 'dso/add_dso', component: CreateDsoComponent,  canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Admin)]},
  { path: 'dso/profile', component: ProfileComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Admin)]},
  { path: 'prosummer/home', component:HomeComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Prosummer)]},
  { path: 'prosummer/energyInfo', component:ProsumerEnergyComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Prosummer)]},
  { path: 'prosummer/device', component:ProsumerDeviceDetailsComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Prosummer)]},
  { path: 'prosummer/profile', component: ProfileComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Prosummer)]},
  { path: 'prosummer/new-User', component: ProsumerFirstTimeLoggedComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Prosummer)]},
  { path: 'prosummer/profile/edit', component: ProssumerEditProfileComponent, canActivate: [AuthGuard, RoleGuard.forRoles(RoleEnum.Prosummer)]},
  { path: 'login', component: LoginComponent, canActivate: [LoginRegisterGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoginRegisterGuard]},
  { path: '**', component: PagenotfoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
