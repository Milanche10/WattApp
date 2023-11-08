import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prosummer, ProsummerPaging, ProsummerWithHighestProduced, ProsummerWithHighestUsage } from 'src/app/models/Prosummer';
import { ProsummerRegisterParams } from 'src/app/models/RegisterParams';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { environment } from 'src/environment/environment';
import { Record } from 'src/app/models/Record';
import { ProsummerFilterDTO } from 'src/app/models/ProsummerFilterDTO';
import { ProsummerPagingDTO } from 'src/app/models/ProsummerPagingDTO';
import { ProsummerDTO } from 'src/app/models/ProsummerDTO';
import { Prediction } from 'src/app/models/Prediction';
import { MostlyUsedDevice } from 'src/app/models/Device';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl: string

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = environment.apiUrl
   }

   getAllProsummers(): Observable<Prosummer[]> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<Prosummer[]>(this.baseUrl+"/api/Prosummer/getAllProsummers",{headers: headers})
   }



   getProsummersPaging(page: number): Observable<ProsummerPaging> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<ProsummerPaging>(this.baseUrl+"/api/Prosummer/getAllProsummers/"+page,{headers: headers})
   }

   registerProsummer(body: ProsummerRegisterParams): Observable<any> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.post<any>(this.baseUrl+"/auth/registerProsummer",body,{headers: headers})
   }
   initRegisterProsummer(body: ProsummerRegisterParams): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl+"/auth/initRegisterProsummer",body,)
   }

   registerDispatcher(body: Object): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth/registration`, body);
   }

   doesUserExists(email: string) : Observable<boolean>{
    //const token = sessionStorage.getItem("token")!
    //const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    const params = new HttpParams().set("email",email)
    return this.httpClient.get<boolean>(this.baseUrl+"/api/user/doesExists",{params:params});
   }

   deleteProsummer(param: string): Observable<any> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.delete<any>(this.baseUrl+"/api/prosummer/deleteProsummer/",
    {
      body: {id: param},
      headers: headers
    })
   }

   changeState(crypId: string, state: number): Observable<any> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.patch<any>(this.baseUrl+"/api/Prosummer/changeState",{
      id:crypId,
      state:state
    },
    {
      headers:headers
    })
   }
   getProsummerById(crypId:string) : Observable<Prosummer>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    const params = new HttpParams().set("id",crypId)
    return this.httpClient.get<Prosummer>(this.baseUrl+"/api/Prosummer/getProsummerById",{headers:headers,params:params})
  }



  getAllProsummersByFilter(prosummerFilterDTO: ProsummerFilterDTO): Observable<ProsummerPagingDTO>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.post<ProsummerPagingDTO>(this.baseUrl+"/api/Prosummer/getAllProsummersByFilter", prosummerFilterDTO, { headers:headers })
  }

  getMonthlyRecords(): Observable<Record[]> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<Record[]>(this.baseUrl+"/api/record/AllMonthlyRecords",{headers:headers});
  }
  getMonthlyRecordsByDevice(id : number) : Observable<Record[]>{
    const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Record[]>(this.baseUrl+"/api/record/MonthlyPerDevice", body);
  }
  getMonthlyRecordsByProsummer(encryptedId : string) : Observable<Record[]>{
    //const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Record[]>(this.baseUrl+"/api/record/MonthlyPerProsummer", body);
  }
  getRecordsForSevenDays(): Observable<Record[]> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<Record[]>(this.baseUrl+"/api/record/RecordsForSevenDays",{headers:headers});
  }
  getRecordsByDeviceForSeven(id : number) : Observable<Record[]>{
    const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Record[]>(this.baseUrl+"/api/record/RecordsPerDeviceForSevenDays", body);
  }
  getRecordsByProsummerForSeven(encryptedId : string) : Observable<Record[]>{
    //const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Record[]>(this.baseUrl+"/api/record/RecordsPerProsummerForSevenDays", body);
  }

  getMonthlyPredictions(): Observable<Prediction[]> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<Prediction[]>(this.baseUrl+"/api/prediction/AllMonthlyPredictions",{headers:headers});
  }
  getMonthlyPredictionsByDevice(id : number) : Observable<Prediction[]>{
    const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Prediction[]>(this.baseUrl+"/api/prediction/PredictionsPerDevice", body);
  }
  getMonthlyPredictionsByProsummer(encryptedId : string) : Observable<Prediction[]>{
    //const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Prediction[]>(this.baseUrl+"/api/prediction/MonthlyPerProsummer", body);
  }
  getPredictionForSevenDays(): Observable<Prediction[]> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<Prediction[]>(this.baseUrl+"/api/prediction/AllPredictionsForSevenDays",{headers:headers});
  }
  getPredictionByDeviceForSeven(id : number) : Observable<Prediction[]>{
    const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Prediction[]>(this.baseUrl+"/api/prediction/PredictionsPerDeviceForSevenDays", body);
  }
  getPredictionByProsummerForSeven(encryptedId : string) : Observable<Prediction[]>{
    //const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Prediction[]>(this.baseUrl+"/api/prediction/PredictionsPerProsummerForSevenDays", body);
  }

  getPredictionSevenDaysBefore(): Observable<Prediction[]> {
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<Prediction[]>(this.baseUrl+"/api/prediction/AllPredictionsSevenDaysBefore",{headers:headers});
  }
  getPredictionByDeviceSevenDaysBefore(id : number) : Observable<Prediction[]>{
    const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Prediction[]>(this.baseUrl+"/api/prediction/PredictionsPerDeviceSevenDaysBefore", body);
  }
  getPredictionByProsummerSevenDaysBefore(encryptedId : string) : Observable<Prediction[]>{
    //const encryptedId = AESencryptorService.encriptyNumber(id);
    const body = { id: encryptedId };
    return this.httpClient.post<Prediction[]>(this.baseUrl+"/api/prediction/PredictionsPerProsummerSevenDaysBefore", body);
  }

  getTotalUsage() : Observable<number>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<number>(this.baseUrl+"/api/record/TotalUsage",{headers:headers});
  }
  getTotalProduced() : Observable<number>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<number>(this.baseUrl+"/api/record/TotalProduced",{headers:headers});
  }

  getDeviceWithHighestUsage() : Observable<MostlyUsedDevice>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<MostlyUsedDevice>(this.baseUrl+"/api/record/HighestUsageDevice",{headers:headers});
  }
  getDeviceWithHighestProduced() : Observable<MostlyUsedDevice>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<MostlyUsedDevice>(this.baseUrl+"/api/record/HighestProducedDevice",{headers:headers});
  }

  getProsummerWithHighestUsage() : Observable<ProsummerWithHighestUsage>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<ProsummerWithHighestUsage>(this.baseUrl+"/api/record/HighestUsageProsummer",{headers:headers});
  }

  getProsummerWithHighestProduced() : Observable<ProsummerWithHighestProduced>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<ProsummerWithHighestProduced>(this.baseUrl+"/api/record/HighestProducedProsummer",{headers:headers});
  }

  getCurrentUsage() : Observable<number>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<number>(this.baseUrl+"/api/record/CurrentUsage",{headers:headers});
  }
  getCurrentProduced() : Observable<number>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<number>(this.baseUrl+"/api/record/CurrentProduced",{headers:headers});
  }
  getTotalUsageForSevenDays() : Observable<number>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<number>(this.baseUrl+"/api/record/TotalUsageForLastSevenDays",{headers:headers});
  }
  getTotalProducedForSevenDays() : Observable<number>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<number>(this.baseUrl+"/api/record/TotalProducedForLastSevenDays",{headers:headers});
  }
  getTotalUsageForLastMonth() : Observable<number>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<number>(this.baseUrl+"/api/record/TotalUsageForLastMonth",{headers:headers});
  }
  getTotalProducedForLastMonth() : Observable<number>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<number>(this.baseUrl+"/api/record/TotalProducedForLastMonth",{headers:headers});
  }

  getCurrentUsageForProsummer(encryptedId : string) : Observable<number>{
    const body = { id: encryptedId };
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.post<number>(this.baseUrl+"/api/record/CurrentUsageProsummer",body,{headers:headers});
  }

  getCurrentProducedForProsummer(encryptedId : string) : Observable<number>{
    const body = { id: encryptedId };
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.post<number>(this.baseUrl+"/api/record/CurrentProducedProsummer",body,{headers:headers});
  }

  getDeviceWithHighestUsagePerProsummer(encryptedId : string) : Observable<MostlyUsedDevice>{

    const body = { id: encryptedId };
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.post<MostlyUsedDevice>(this.baseUrl+"/api/record/HighestUsageDevicePerProsummer",body,{headers:headers});
  }

  getDeviceWithHighestProducedPerProsummer(encryptedId : string) : Observable<MostlyUsedDevice>{
    const body = { id: encryptedId };
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.post<MostlyUsedDevice>(this.baseUrl+"/api/record/HighestProducedDevicePerProsummer",body,{headers:headers});

}

  getTotalUsageForProsummer(encryptedId : string) : Observable<number>{
    const body = { id: encryptedId };
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.post<number>(this.baseUrl+"/api/record/TotalUsageForProsummer",body,{headers:headers});
  }
  getTotalProducedForProsummer(encryptedId : string) : Observable<number>{
    const body = { id: encryptedId };
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.post<number>(this.baseUrl+"/api/record/TotalProducedForProsummer",body,{headers:headers});
  }

  movePredictionToRecords() : void{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    this.httpClient.post<void>(this.baseUrl+"/api/prediction/PredictionToRecord",{headers:headers}).subscribe(()=>{
    }, (error)=>{
    });

  }

  sendEmail(email: string) : void{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    const params = new HttpParams().set("email",email)
    this.httpClient.get<void>(this.baseUrl+"/api/Prosummer/sendEmail",{headers:headers,params:params}).subscribe(() => {
      // Success callback
    }, (error) => {
      // Error callback
    });
  }

  verifyEmail(email: string) : Observable<boolean>{
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    const body = { email: email };
    return this.httpClient.post<boolean>(this.baseUrl+"/api/Prosummer/verifyEmail",body,{headers:headers});
  }

  getProsummerByAdresseCity(city: string): Observable<ProsummerDTO[]> {
    const params = new HttpParams().set('city', city);
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<ProsummerDTO[]>(this.baseUrl+"/api/Prosummer/getAllProsummerByAdressCity", {headers:headers, params:params });
  }

  getAllProsummerByAdressCounty(county: string): Observable<ProsummerDTO[]> {
    const params = new HttpParams().set('county', county);
    const token = sessionStorage.getItem("token")!
    const headers = new HttpHeaders().set('Authorization','Bearer '+token)
    return this.httpClient.get<ProsummerDTO[]>(this.baseUrl+"/api/Prosummer/getAllProsummerByAdressCounty", {headers:headers, params:params });
  }

}
