import { Injectable } from '@angular/core'

import {Observable, BehaviorSubject} from 'rxjs/Rx'

import { Vote } from '../domain/vote'

@Injectable()
export class AvisService {

  private avis:BehaviorSubject<Vote> = new BehaviorSubject(new Vote(null, null))

	constructor() { }

	getAvisMessage() : Observable<Vote> {
		return this.avis.asObservable();
	}
	
	updateAvisMessage(vote:Vote) : void {
		this.avis.next(vote)
	}
}
