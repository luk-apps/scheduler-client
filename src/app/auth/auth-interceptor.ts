import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.Authorization) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + currentUser.Authorization)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}