import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceDetail } from 'src/app/models/Device';
import { Prediction } from 'src/app/models/Prediction';
import { Prosummer } from 'src/app/models/Prosummer';
import { Record } from 'src/app/models/Record';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseUrl: string

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.apiUrl
   }

   getDeviceById(id: string): Observable<DeviceDetail> {
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + sessionStorage.getItem("token")
    })
    const params = new HttpParams().append("id", id);
    return this.httpClient.get<DeviceDetail>(`${environment.apiUrl}/api/device/getDeviceById`, {headers: headers, params: params});
   }

   getDevicesByProsumer(prosumerId: string): Observable<Prosummer> {
    const token = sessionStorage.getItem('token')!
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    const params = {id: prosumerId};
    
    return this.httpClient.get<Prosummer>(`${this.baseUrl}/api/Prosummer/getProsummerById`, {headers: headers, params: params});
   }

   getAllDevicesByProsummers(id: number): Observable<any[]> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    const encId = AESencryptorService.encriptyNumber(id);
    return this.httpClient.post<any[]>(this.baseUrl+"/api/device/getAllByProsummer",{
      id:encId
    },{headers: headers})
   }

   changeDeviceStatus(device: DeviceDetail): Observable<any>{
      // If devices is turned on, turn it off and otherwise
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      })
      
      const status = device.status ? false : true
      const data = {
        id: AESencryptorService.decriptyString(device.id),
        status: status
      }

      return this.httpClient.put(`${this.baseUrl}/api/device/updateDevice`, data, {headers: headers})
    }

    deleteDevice(deviceId: number): Observable<any> {
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      })
  
      const params = new HttpParams().set("id", deviceId);
      return this.httpClient.delete(`${this.baseUrl}/api/device/deleteDevice`, {headers: headers, params: params});
    }

    changeDsoVisibility(device: DeviceDetail): Observable<any> {
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      })
      
      const visibility = device.isVisible ? false : true
      const data = {
        id: AESencryptorService.decriptyString(device.id),
        visibility: visibility
      }
  
      return this.httpClient.put(`${this.baseUrl}/api/device/updateVisibility`, data, {headers: headers});
    }

    changeDsoManaging(device: DeviceDetail) {
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      })
      
      const accesability = device.isAccesable ? false : true
      const data = {
        id: AESencryptorService.decriptyString(device.id),
        accesability: accesability
      }
  
      return this.httpClient.put(`${this.baseUrl}/api/device/updateAccesability`, data, {headers: headers});
    }

    addDevice(data: object) {
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token"),
      })

      return this.httpClient.post(`${this.baseUrl}/api/device/addDevice`, data, {headers: headers});
    }

    getCurrentEnergyByDevice(deviceId: string, deviceType: string): Observable<number> {
      if(deviceType.trim().toLowerCase() == 'potrosac') {
        return this.getCurrentConsumptionByDevice(deviceId);
      } else {
        return this.getCurrentProductionByDevice(deviceId);
      }
    }

    private getCurrentConsumptionByDevice(deviceId: string): Observable<number> {
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      })
      const params = new HttpParams().append("deviceId", deviceId);
      return this.httpClient.get<number>(`${environment.apiUrl}/api/record/CurrentUsageDevice`, {headers: headers, params: params});
    }

    private getCurrentProductionByDevice(deviceId: string): Observable<number> {
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      })
      const params = new HttpParams().append("deviceId", deviceId);
      return this.httpClient.get<number>(`${environment.apiUrl}/api/record/CurrentProducedDevice`, {headers: headers, params: params});
    }

    getTodayEnergyByDevice(deviceId: string, deviceType: string): Observable<number> {
      if(deviceType.trim().toLowerCase() == 'potrosac') {
        return this.getTodayConsumptionByDevice(deviceId);
      } else {
        return this.getTodayProductionByDevice(deviceId);
      }
    }

    private getTodayConsumptionByDevice(deviceId: string): Observable<number> {
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      })
      const params = {
        id: deviceId
      };
      return this.httpClient.post<number>(`${environment.apiUrl}/api/record/TodayUsageDevice`, params, {headers: headers});
    }

    private getTodayProductionByDevice(deviceId: string): Observable<number> {
      const headers = new HttpHeaders({
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      })
      const params = {
        id: deviceId
      };
      return this.httpClient.post<number>(`${environment.apiUrl}/api/record/TodayProducedDevice`, params, {headers: headers});
    }
    
    getLastSevenDaysEnergyByDevice(deviceId: string): Observable<Record[]> {
      const data = {
        id: deviceId
      }

      return this.httpClient.post<Record[]>(`${this.baseUrl}/api/record/RecordsPerDeviceForSevenDays`, data, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        })
      });
    }

    getThisMonthEnergyByDevice(deviceId: string): Observable<Record[]> {
      const data = {
        id: deviceId
      }

      return this.httpClient.post<Record[]>(`${this.baseUrl}/api/record/MonthlyPerDevice`, data, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        })
      });
    }

    getPredictionsForSevenDaysByDevice(deviceId: string): Observable<Prediction[]> {
      const data = {
        id: deviceId
      }

      return this.httpClient.post<Prediction[]>(`${this.baseUrl}/api/prediction/PredictionsPerDeviceForSevenDays`, data, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        })
      });
    }

    getPredictionsForSevenDaysBeforeByDevice(deviceId: string): Observable<Prediction[]> {
      const data = {
        id: deviceId
      }

      return this.httpClient.post<Prediction[]>(`${this.baseUrl}/api/prediction/PredictionsPerDeviceSevenDaysBefore`, data, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        })
      });
    }

    getMonthlyEnergyByDevice(deviceId: string): Observable<Record[]> {
      const data = {
        id: deviceId
      }

      return this.httpClient.post<Record[]>(`${this.baseUrl}/api/record/MonthlyPerDevice`, data, {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + sessionStorage.getItem("token"),
        })
      });
    }
}
