import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  profileimg: string;
}

export interface Course {
  courseId: number;
  title: string;
  description: string;
  price: number;
}



export interface Purchase {
  purchaseId?: number;
  userId: number;
  courseId: number;
  amount: number;
  status: string;
  transactionId?: string;
  purchaseDate?: string;
}
@Injectable({
  providedIn: 'root'
})
export class Data { 

  constructor(private http: HttpClient) { 
    // 🔹 Refresh hone par localStorage se user wapas load karo
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      this.userSubject.next(parsedUser);
      this.loginStatus.next(true);
    }
  }

  // ------------------ Observables ------------------
  private loginStatus = new BehaviorSubject<boolean>(false);
  isLogin$ = this.loginStatus.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  // ------------------ API URLs ------------------
  apiUrl = 'https://localhost:7145/api'; 
  imageUrl = 'https://localhost:7145/Uploads/'; 

  // ------------------ API Calls ------------------
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Home/crousel`);
  }
  
  getAboutData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Home/about`);
  }

  PostRegister(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Home/register`, data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Home/login`, data);
  }

  setSubject(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Home/subjects`, data);
  }

  getSubject(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Home/subject`);
  }

  setCourse(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Home/acCourses`, data);
  }

  getCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Home/acCourses`);
  }

  setCourseVideo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Home/coursevedio`, data);
  } 

  getCourseVideo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Home/coursevedio`);
  }

  getCourseVideoByCourseId(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Home/coursevedio/${courseId}`);
  }

  // ---------------- Purchases ----------------https://localhost:7145/api/Home/create-order
  createOrder(purchase: Purchase): Observable<any> {
    console.log('Creating order:', purchase); // Debug log
    return this.http.post(`${this.apiUrl}/Home/create-order`, purchase);
  }

  updatePurchaseStatus(purchaseId: number, status: string): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.apiUrl}/Home/update-status/${purchaseId}`, { status });
  }

  // getUserPurchases(userId: number): Observable<Purchase[]> {
  //   return this.http.get<Purchase[]>(`${this.apiUrl}/Home/user/${userId}`);
  // }

  // getAllPurchases(): Observable<Purchase[]> {
  //   return this.http.get<Purchase[]>(`${this.apiUrl}/Home/purchase`);
  // }

  // ------------------ Auth Handling ------------------
  setLogin(status: boolean) {
    this.loginStatus.next(status);
  }

  setUser(user: User) {
    console.log('Setting user:', user);
    this.userSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user)); // ✅ Save in localStorage
  }

  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.loginStatus.next(false);
  }


  // Data service
getUserDashboard(userId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/Home/dashboard/${userId}`);
}



}
