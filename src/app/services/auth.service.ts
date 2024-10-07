import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from './data.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // data for API Movie
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey: string = environment.API_KEY;
  private username: string = environment.USERNAME;
  private password: string = environment.PASSWORD;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.isAuthenticatedSubject.next(!!user);
    });
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  // ========================================= API TMDB

  // Get the request token
  private getRequestToken(): Observable<string> {
    const url = `${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.request_token),
      catchError(this.handleError)
    );
  }

  // Validate the request token with the user's credentials
  private validateRequestToken(requestToken: string): Observable<void> {
    const url = `${this.apiUrl}/authentication/token/validate_with_login?api_key=${this.apiKey}`;
    const body = {
      username: this.username,
      password: this.password,
      request_token: requestToken
    };
    return this.http.post<any>(url, body).pipe(
      map(() => { }),
      catchError(this.handleError)
    );
  }

  // Create a session ID
  private createSession(requestToken: string): Observable<string> {
    const url = `${this.apiUrl}/authentication/session/new?api_key=${this.apiKey}`;
    const body = { request_token: requestToken };
    return this.http.post<any>(url, body).pipe(
      map(response => response.session_id),
      catchError(this.handleError)
    );
  }

  // Get account details to retrieve accountId
  private getAccountId(sessionId: string): Observable<number> {
    const url = `${this.apiUrl}/account?api_key=${this.apiKey}&session_id=${sessionId}`;
    return this.http.get<any>(url).pipe(
      map(response => response.id),
      catchError(this.handleError)
    );
  }

  // Public method to get accountId
  public authenticateAndGetAccountId(): Observable<number> {
    return this.getRequestToken().pipe(
      switchMap(requestToken => this.validateRequestToken(requestToken).pipe(
        switchMap(() => this.createSession(requestToken)),
        switchMap(sessionId => this.getAccountId(sessionId))
      ))
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  // ========================================= Firestone

  // Регистрация нового пользователя
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Вход пользователя
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Выход пользователя
  logout() {
    return this.afAuth.signOut();
  }

  // Получение текущего пользователя
  getCurrentUser() {
    return this.afAuth.authState;
  }
}
