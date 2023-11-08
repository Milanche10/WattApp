import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prosummer } from 'src/app/models/Prosummer';
import { RealEstateResponse } from 'src/app/models/RealEstateResponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProsumerService {

  constructor(private http: HttpClient) { }

  getProsumerByUserId(userId: string): Observable<Prosummer> {
    const params = `id=${userId}`
    return this.http.get<Prosummer>(`${environment.apiUrl}/api/Prosummer/getProsummerById?${params}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem("token")!}`
      })
    })
  }

  getProsumerRealEstates(prosumerId: number): Observable<RealEstateResponse> {
    return this.http.get<RealEstateResponse>(`${environment.apiUrl}/api/RealEstate/getRealEstateByProsummer`, {
      params: {
        prosummerId: prosumerId
      }, 
      headers: new HttpHeaders({
          'Authorization': `Bearer ${sessionStorage.getItem("token")!}`
        })
    })
  }
}
