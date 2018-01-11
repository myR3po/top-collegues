import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Collegue } from '../domain/collegue'

import { environment as env } from '../../../environments/environment'

@Injectable()
export class CollegueService {
	
	private collegues:Collegue[]
	
	constructor(private http:HttpClient){}

	listerCollegues():Promise<Collegue[]> {
		
		return new Promise<Collegue[]>((resolve, reject) => {

			if(this.collegues){

				resolve(this.collegues)
			}else{
				this.http.get<Collegue[]>(env.backendUrl).toPromise().then(data => {
					this.collegues = data

					resolve(this.collegues)
				})
			}
		})
	}

	sauvegarder(newCollegue:Collegue):Promise<Collegue[]> {

		return new Promise<Collegue[]>((resolve, reject) => {

			this.http.post<Collegue[]>(env.backendUrl,
					newCollegue.toString(), 
					{headers: new HttpHeaders().set('Content-Type', 'application/json')})
			.toPromise()
			.then(data => {
					this.collegues = data
					resolve(this.collegues)
			})
			
		})
	}

	aimerUnCollegue(unCollegue:Collegue):Promise<Collegue> {
		let body:string = '{"action":"aimer"}'

		return this.http.patch<Collegue>(env.backendUrl+ '/' + unCollegue.pseudo,
							body,
							{headers: new HttpHeaders().set('Content-Type', 'application/json')})
			.toPromise(); 
	}

	detesterUnCollegue(unCollegue:Collegue):Promise<Collegue> {

		let body:string =  '{"action":"detester"}'

		return this.http.patch<Collegue>(env.backendUrl+ '/' + unCollegue.pseudo,
				body,
				{headers: new HttpHeaders().set('Content-Type', 'application/json')})
			.toPromise(); 
	}
}