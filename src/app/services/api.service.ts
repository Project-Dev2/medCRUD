import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postRadiology(data:any) {
    return this.http.post<any>(environment.baseApi+"radiology", data);
  }
  getRadiologys() {
    return this.http.get<any>(environment.baseApi+"radiology");
  }
  getRadiologyById(id:any) {
    return this.http.get<any>(environment.baseApi+"radiology/"+id);
  }
  updateRadiology(data:any, id:number) {
    return this.http.put<any>(environment.baseApi+"radiology/"+id, data);
  }
  deleteRadiology(id:number) {
    return this.http.delete<any>(environment.baseApi+"radiology/"+id);
  }
}
