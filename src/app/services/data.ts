import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // HTTP requests bhejne ke liye
import { Observable } from 'rxjs'; // Observable return karne ke liye (async data handle karne ke liye)


@Injectable({
  providedIn: 'root'
})
export class Data {

  constructor(private http: HttpClient) { }
   public currentUser: any = null;

  apiUrl = 'https://localhost:7145/api/Home'; // API URL jahan se data fetch karna hai

  imageUrl = 'https://localhost:7145/Uploads/'; // Image URL jahan se images fetch karna hai

  getData(): Observable<any> {
    return this.http.get('https://localhost:7145/api/Home/crousel'); // API se data fetch karne ke liye
  }
  
getAboutData(): Observable<any> {
    return this.http.get('https://localhost:7145/api/Home/about'); // About data fetch karne ke liye
  }

  PostRegister(data: any): Observable<any> {
    return this.http.post('https://localhost:7145/api/Home/register', data); // Register data post karne ke liye
  }

  loginUser(data: any): Observable<any> {
    return this.http.post('https://localhost:7145/api/Home/login', data); // Login data post karne ke liye
  }

setSubject(data: any): Observable<any> {
    return this.http.post('https://localhost:7145/api/Home/subjects', data); // Subject data post karne ke liye
  }


  
 getSubject(): Observable<any> {
    return this.http.get('https://localhost:7145/api/Home/subject'); // Students data fetch karne ke liye
  }


  setCourse(data: any): Observable<any> {
    return this.http.post('https://localhost:7145/api/Home/acCourses', data); // Course data post karne ke liye
  }
  

getCourses(): Observable<any> {
    return this.http.get('https://localhost:7145/api/Home/acCourses'); // Courses data fetch karne ke liye
  }

}
