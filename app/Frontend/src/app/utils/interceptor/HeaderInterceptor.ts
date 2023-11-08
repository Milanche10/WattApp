import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderIntereceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Credentials' : 'true',
                'Access-Control-Allow-Methods' : 'POST, GET, PUT, DELETE',
                'Access-Control-Allow-Headers' : 'content-type',
                'Content-Type' : 'application/json'
            }
        })

        return next.handle(req);
    }

}