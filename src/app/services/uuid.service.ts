import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  constructor() { }

  getUuid() : string{
    return crypto.randomUUID()
  }
}
