import { Injectable, ErrorHandler } from '@angular/core';
import { AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    console.log('Unexpected error: ', error)
  }
}