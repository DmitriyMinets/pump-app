import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IMotor } from '../models/motor';
import { IMaterial } from '../models/material';
import { IPumpRQ } from '../models/pumpRQ';
import { Pump } from '../models/pump';
import { ErrorService } from './error.service';
import { IMotorRQ } from '../models/motorRQ';

@Injectable({
  providedIn: 'any',
})
export class PumpService {
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {}

  getAllPump(): Observable<Pump[]> {
    return this.httpClient
      .get<Pump[]>('https://localhost:7235/api/Pump/Get')
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getAllmotors(): Observable<IMotor[]> {
    return this.httpClient
      .get<IMotor[]>('https://localhost:7235/api/Pump/GetMotors')
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getAllMaterials(): Observable<IMaterial[]> {
    return this.httpClient
      .get<IMaterial[]>('https://localhost:7235/api/Pump/GetMaterials')
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  addPump(pump: IPumpRQ): Observable<HttpResponse<any>> {
    const formData = this.createFormDataForPump(pump);

    return this.httpClient
      .post('https://localhost:7235/api/Pump/AddPump', formData, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  addMotor(motor: IMotorRQ): Observable<HttpResponse<any>> {
    return this.httpClient
      .post('https://localhost:7235/api/Pump/AddMotor', motor, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  removePump(id: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .delete(`https://localhost:7235/api/Pump/Delete?id=${id}`, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  updatePump(pump: IPumpRQ): Observable<HttpResponse<any>> {
    const formData = this.createFormDataForPump(pump);
    return this.httpClient
      .put('https://localhost:7235/api/Pump/UpdatePump', formData, {
        observe: 'response',
      })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }

  private createFormDataForPump(pump: IPumpRQ): FormData {
    const formData = new FormData();
    const locale = 'ru-RU';
    formData.append('id', pump.id.toString());
    formData.append('name', pump.name);
    formData.append('maxPressure', pump.maxPressure.toLocaleString(locale));
    formData.append(
      'liquidTemperature',
      pump.liquidTemperature.toLocaleString(locale)
    );
    formData.append('weight', pump.weight.toLocaleString(locale));
    formData.append('motorId', pump.motorId.toString());
    formData.append('bodyMaterialId', pump.bodyMaterialId.toString());
    formData.append('impellerMaterialId', pump.impellerMaterialId.toString());
    formData.append('description', pump.description || '');
    formData.append('price', pump.price.toLocaleString(locale));

    if (pump.image) {
      formData.append('image', pump.image);
    }
    if (pump.imageUrl) {
      formData.append('imageUrl', pump.imageUrl);
    }
    return formData;
  }
}
