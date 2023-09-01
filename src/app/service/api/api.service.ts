import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from '../events/events.service';
import { UtilsService } from '../utils/utils.service';




const TIMEOUT_MILLISECONDS = 10000;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token?: string;
  server: string;

  constructor(
    public http: HttpClient,
    private events: EventsService,
    private utils: UtilsService,
    private translate: TranslateService
  ) {
    this.server = "https://api.accuropt.com/apt/users/actions/login";
  }

  get<T>(endpoint: string, params?: any): Promise<T> {
    const _headers = new HttpHeaders({ 'X-Authorization': this.token || '' });

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const element = params[key];
        if (element === undefined) {
          delete params[key];
        }
      }
    }

    return this._processData<T>(
      lastValueFrom(
        this.http.get(this.server + endpoint, { headers: _headers, params }).pipe(timeout(TIMEOUT_MILLISECONDS))
      )
    );
  }

  post<T>(endpoint: string, body: any): Promise<T> {
    const _headers = new HttpHeaders({ 'X-Authorization': this.token || '' });

    return this._processData<T>(
      lastValueFrom(
        this.http.post(this.server + endpoint, body, { headers: _headers }).pipe(timeout(TIMEOUT_MILLISECONDS))
      )
    );
  }

  put<T>(endpoint: string, body: any): Promise<T> {
    const _headers = new HttpHeaders({ 'X-Authorization': this.token || '' });
    return this._processData<T>(
      lastValueFrom(
        this.http.put(this.server + endpoint, body, { headers: _headers }).pipe(timeout(TIMEOUT_MILLISECONDS))
      )
    );
  }

  delete<T>(endpoint: string): Promise<T> {
    const _headers = new HttpHeaders({ 'X-Authorization': this.token || '' });
    return this._processData<T>(
      lastValueFrom(this.http.delete(this.server + endpoint, { headers: _headers }).pipe(timeout(TIMEOUT_MILLISECONDS)))
    );
  }

  patch<T>(endpoint: string, body: any): Promise<T> {
    const _headers = new HttpHeaders({ 'X-Authorization': this.token || '' });
    return this._processData<T>(
      lastValueFrom(
        this.http.patch(this.server + endpoint, body, { headers: _headers }).pipe(timeout(TIMEOUT_MILLISECONDS))
      )
    );
  }

  private _processData<T>(req: Promise<any>): Promise<T> {
    return new Promise((resolve, reject) => {
      req
        .then((res) => {
          if (!res || !res.meta) {
            return resolve(res);
          }
          if (res.meta.error) {
            Haptics.notification({
              type: NotificationType.Error,
            });
            return reject({
              code: res.meta.code,
              error: true,
              message: this.translate.instant('ERROR_' + res.meta.code) || res.meta.message,
            });
          }
          resolve(res.data);
        })
        .catch((err) => {
          Haptics.notification({
            type: NotificationType.Error,
          });

          let formatErr: any;
          if (err.status === 401) {
            this.events.publish('user:token-expired');
          }

          if (err.name === 'TimeoutError') {
            this.utils.log(err.message);
            formatErr = {
              code: 100000,
              error: true,
              message: 'Request timeout',
            };
          } else {
            this.utils.log(err.message);
            formatErr = {
              code: 100000,
              error: true,
              message: 'Request Failed, please try again later',
            };
          }

          return reject(formatErr);
        });
    });
  }
}
