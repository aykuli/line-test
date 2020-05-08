import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const PORT = 5000;

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }
}