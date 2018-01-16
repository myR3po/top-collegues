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
		console.log(newOpinion.commentaire)
			let com = {
				commentaire:newOpinion.commentaire,
				pseudo : newOpinion.collegue.pseudo
			}
			this.http.post<Collegue>(env.backendUrlComments,
					com, 
					{headers: new HttpHeaders().set('Content-Type', 'application/json')})
					.subscribe()
	}

}
