import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable, BehaviorSubject} from 'rxjs/Rx'
import { environment as env } from '../../../environments/environment'

import { Collegue } from '../domain/collegue'
import { Opinion } from '../domain/opinion'

@Injectable()
export class CommentaireService {

	constructor(private http:HttpClient) { }
	
	listerOpinionPourCollegue(colleguePseudo): Observable<string[]>{
		return this.http.get<string[]>(env.backendUrlComments+'/'+ colleguePseudo)
	}
	
	sauvegarder(newOpinion:Opinion) : void {

			this.http.post<Collegue>(env.backendUrlComments,
					newOpinion, 
					{headers: new HttpHeaders().set('Content-Type', 'application/json')})
					.subscribe()
	}

}
