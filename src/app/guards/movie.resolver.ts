// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
// import { HttpClient } from "@angular/common/http";
// import { movie } from "../models/movie";

// @Injectable({
//     providedIn: 'root'
// })

// export class MovieResolver implements Resolve<movie> {
//     constructor(private http: HttpClient) { }
    
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): movie {
//         const id = route.paramMap.get('id');
//         return this.http.get<movie>('/api/movie/${id}')
        
//     }
// }