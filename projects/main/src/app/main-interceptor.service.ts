import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root',
})
export class MockInterceptor implements HttpInterceptor {
  constructor(private mock: MockService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return of(
      new HttpResponse({ status: 200, body: this.mock.getMock(request.url) })
    );
  }
}
