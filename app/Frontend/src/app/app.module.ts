import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderIntereceptor } from './utils/interceptor/HeaderInterceptor';
import { DsoHomeComponent } from './dsoComponets/dso-home/dso-home.component';
import { ProssumerHomeComponent } from './prossumerComponets/prossumer-home/prossumer-home.component';
import { DsoProfileComponent } from './dsoComponets/dso-profile/dso-profile.component';
import { ProssumerProfileComponent } from './prossumerComponets/prossumer-profile/prossumer-profile.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DsoNavBarComponent } from './dsoComponets/dso-nav-bar/dso-nav-bar.component';
import { ProssumerNavBarComponent } from './prossumerComponets/prossumer-nav-bar/prossumer-nav-bar.component';
import { DsoAdminDashboardComponent } from './dsoComponets/dso-admin-dashboard/dso-admin-dashboard.component';

import { ProssumerAllDevicesComponent } from './prossumerComponets/prossumer-all-devices/prossumer-all-devices.component';
import { ModalComponent } from './utils/modals/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UserInfoComponent } from './utils/modals/ProsummerModals/details/user-info/user-info.component';
import { DevicesComponent } from './utils/modals/ProsummerModals/details/devices/devices.component';
import { CreateUserComponent } from './utils/modals/dsoModals/create-user/create-user.component';
import { ProsumerFirstTimeLoggedComponent } from './prossumerComponets/prosumer-first-time-logged/prosumer-first-time-logged.component';
import { ProssumerDataComponent } from './prossumerComponets/prossumer-profile/prossumer-data/prossumer-data.component';
import { ProssummerSingleDataComponent } from './prossumerComponets/prossumer-profile/prossumer-data/prossummer-single-data/prossummer-single-data.component';
import { ProssumerEditProfileComponent } from './prossumerComponets/prossumer-edit-profile/prossumer-edit-profile.component';
import { ProssumerEditDataComponent } from './prossumerComponets/prossumer-edit-profile/prossumer-edit-data/prossumer-edit-data.component';
import { ProssumerEditSingleDataComponent } from './prossumerComponets/prossumer-edit-profile/prossumer-edit-data/prossumer-edit-single-data/prossumer-edit-single-data.component';
import { ProsumerDevicesComponent } from './prossumerComponets/prosumer-devices/prosumer-devices.component';
import { ProsumerSingleDeviceComponent } from './prossumerComponets/prosumer-devices/prosumer-single-device/prosumer-single-device.component';
import { DsoMapComponent } from './dsoComponets/dso-map/dso-map.component';
import { HistoryChartComponent } from './dsoComponets/history-chart/history-chart.component';
import { AddDeviceComponent } from './utils/modals/ProsummerModals/add/add-device/add-device.component';
import { ProsumerHistoryChartComponent } from './prossumerComponets/prosumer-history-chart/prosumer-history-chart.component';
import { DeviceDetailChartComponent } from './prossumerComponets/device-detail-chart/device-detail-chart.component';
import { DsoHistoryTableComponent } from './dsoComponets/dso-history-table/dso-history-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProssumerHistoryTableComponent } from './prossumerComponets/prossumer-history-table/prossumer-history-table.component';
import { ProsumerDeviceDetailsComponent } from './prossumerComponets/prosumer-device-details/prosumer-device-details.component';


import { DsoPredictionChartComponent } from './dsoComponets/dso-prediction-chart/dso-prediction-chart.component';
import { DsoPredictionTableComponent } from './dsoComponets/dso-prediction-table/dso-prediction-table.component';
import { DsoDeviceUsageChartComponent } from './dsoComponets/dso-device-usage-chart/dso-device-usage-chart.component';
import { DsoDeviceProducedChartComponent } from './dsoComponets/dso-device-produced-chart/dso-device-produced-chart.component';
import { DsoChartComponent } from './dsoComponets/dso-chart/dso-chart.component';
import { DsoProducedChartComponent } from './dsoComponets/dso-produced-chart/dso-produced-chart.component';
import { DsoPredictionSevenDaysTableComponent } from './dsoComponets/dso-prediction-seven-days-table/dso-prediction-seven-days-table.component';
import { DsoRecordSevenDaysTableComponent } from './dsoComponets/dso-record-seven-days-table/dso-record-seven-days-table.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProssumerUsageSevenDaysTableComponent } from './prossumerComponets/prossumer-usage-seven-days-chart/prossumer-usage-seven-days-chart.component'
import { DsoProsumersTable } from './dsoComponets/dso-prosumers-table/dso-prosumers-table.component';
import { ProssumerProducedSevenDaysTableComponent } from './prossumerComponets/prossumer-produced-seven-days-chart/prossumer-produced-seven-days-chart.component';
import { ProssumerPredictionSevenDaysTableComponent } from './prossumerComponets/prossumer-prediction-seven-days-table/prossumer-prediction-seven-days-table.component';
import { ProssumerRecordSevenDaysTableComponent } from './prossumerComponets/prossumer-record-seven-days-table/prossumer-record-seven-days-table.component';
import { PopupComponent } from './utils/modals/popup/popup.component';
import { WeatherWidgetMainComponent } from './dsoComponets/weather/weather.component';
import { ProsumerDeviceUsageChartComponent } from './prossumerComponets/prosumer-device-usage-chart/prosumer-device-usage-chart.component';
import { DsoProsummerProducedChartComponent } from './dsoComponets/dso-prosummer-produced-chart/dso-prosummer-produced-chart.component';
import { DsoProsummerUsageChartComponent } from './dsoComponets/dso-prosummer-usage-chart/dso-prosummer-usage-chart.component';
import { DsoLabelComponent } from './dsoComponets/dso-label/dso-label.component';
import { ProsumerHighestUsageDeviceChartComponent } from './prossumerComponets/prosumer-highest-usage-device-chart/prosumer-highest-usage-device-chart.component';
import { ProsumerHighestProductionDeviceChartComponent } from './prossumerComponets/prosumer-highest-production-device-chart/prosumer-highest-production-device-chart.component';
import { DsoProsumersDevicesComponent } from './dsoComponets/dso-prosumers-devices/dso-prosumers-devices.component';
import { ProsumerDeviceInfoComponent } from './prossumerComponets/prosumer-device-details/prosumer-device-info/prosumer-device-info.component';
import { ProsumerEnergyInfoComponent } from './prossumerComponets/prosumer-device-details/prosumer-energy-info/prosumer-energy-info.component';
import { ProsumerDeviceProductionChartComponent } from './prossumerComponets/prosumer-device-production-chart/prosumer-device-production-chart.component';
import { DsoProsumersSingleDeviceComponent } from './dsoComponets/dso-prosumers-devices/dso-prosumers-single-device/dso-prosumers-single-device.component';
import { ProsumerEnergyComponent } from './prossumerComponets/prosumer-energy/prosumer-energy.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DeviceFilterPipe } from './prossumerComponets/prosumer-devices/DeviceFilter';
import { ProsumerSevenDaysChartComponent } from './prossumerComponets/prosumer-seven-days-chart/prosumer-seven-days-chart.component';
import { CreateDsoComponent } from './utils/modals/create-dso/create-dso.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PagenotfoundComponent,
    NavbarComponent,
    DsoHomeComponent,
    ProssumerHomeComponent,
    DsoProfileComponent,
    ProssumerProfileComponent,
    ProfileComponent,
    DsoNavBarComponent,
    ProssumerNavBarComponent,
    DsoAdminDashboardComponent,
    ModalComponent,
    UserInfoComponent,
    DevicesComponent,
    ProssumerAllDevicesComponent,
    CreateUserComponent,
    ProsumerFirstTimeLoggedComponent,
    ProssumerDataComponent,
    ProssummerSingleDataComponent,
    ProssumerEditProfileComponent,
    ProssumerEditDataComponent,
    ProssumerEditSingleDataComponent,
    ProsumerDevicesComponent,
    ProsumerSingleDeviceComponent,
    DsoMapComponent,
    HistoryChartComponent,
    AddDeviceComponent,
    ProsumerHistoryChartComponent,
    DeviceDetailChartComponent,
    DsoHistoryTableComponent,
    ProsumerDeviceDetailsComponent,
    ProssumerHistoryTableComponent,
    DsoPredictionChartComponent,
    DsoPredictionTableComponent,
    DsoDeviceUsageChartComponent,
    DsoDeviceProducedChartComponent,
    DsoChartComponent,
    DsoProducedChartComponent,
    DsoPredictionSevenDaysTableComponent,
    DsoRecordSevenDaysTableComponent,
    ProssumerUsageSevenDaysTableComponent,
    DsoProsumersTable,
    ProssumerProducedSevenDaysTableComponent,
    ProssumerPredictionSevenDaysTableComponent,
    ProssumerRecordSevenDaysTableComponent,
    PopupComponent,
    WeatherWidgetMainComponent,
    ProsumerDeviceUsageChartComponent,
    DsoProsummerProducedChartComponent,
    DsoProsummerUsageChartComponent,
    DsoLabelComponent,
    ProsumerHighestUsageDeviceChartComponent,
    ProsumerHighestProductionDeviceChartComponent,
    DsoProsumersDevicesComponent,
    ProsumerDeviceInfoComponent,
    ProsumerEnergyInfoComponent,
    ProsumerDeviceProductionChartComponent,
    DsoProsumersSingleDeviceComponent,
    ProsumerEnergyComponent,
    DeviceFilterPipe,
    ProsumerSevenDaysChartComponent,
    ProsumerDeviceProductionChartComponent,
    CreateDsoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgxSliderModule
  ],
  exports:[

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderIntereceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
