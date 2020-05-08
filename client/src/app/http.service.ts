import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import User from '../models/user'

const PORT = 5000;

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  postData(user: User) {
    const body = { email: user.email, password: user.password }
    return this.http.post(`http://localhost:${PORT}`, body)
  }
}