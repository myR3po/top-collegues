import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Collegue } from '../domain/collegue';

@Injectable()
export class CollegueService {
	
	constructor(private http:HttpClient){}

	listerCollegues():Promise<Collegue[]> {

		return this.http.get<Collegue[]>('http://localhost:8080/collegues').toPromise()
	}

	sauvegarder(newCollegue:Collegue):Promise<Collegue[]> {

		return  this.http.post('http://localhost:8080/collegues',
						newCollegue.toString(), 
						{headers: new HttpHeaders().set('Content-Type': 'application/json')})
		.toPromise()
	}

	aimerUnCollegue(unCollegue:Collegue):Promise<Collegue> {
		let body:string = '{"action":"aimer"}'

		return this.http.patch('http://localhost:8080/collegues/'+ unCollegue.pseudo,
							body,
							{headers: new HttpHeaders().set('Content-Type': 'application/json')})
			.toPromise(); 
	}

	detesterUnCollegue(unCollegue:Collegue):Promise<Collegue> {

		let body:string =  '{"action":"detester"}'

		return this.http.patch('http://localhost:8080/collegues/'+ unCollegue.pseudo,
				body,
				{headers: new HttpHeaders().set('Content-Type': 'application/json')})
			.toPromise(); 
	}
}