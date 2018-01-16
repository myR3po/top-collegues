import { Injectable } from '@angular/core';

import {Observable, BehaviorSubject} from 'rxjs/Rx'

@Injectable()
export class FiltreService {

  private limit:BehaviorSubject<string> = new BehaviorSubject('')
  private pseudoToFilter:BehaviorSubject<string> = new BehaviorSubject('')
  
  constructor() { }

  getLimit(): Observable<string>{
	return this.limit.asObservable()
  }
  
  getPseudoToFilter(): Observable<string>{
	return this.pseudoToFilter.asObservable()
  }
  
  updateLimite(limit:number): void{
	if(limit >= 1){
		this.limit.next(('' + limit))
	}
  }
  
  updatePseudoToFilter(pseudo:string): void{
	this.pseudoToFilter.next(pseudo)
  }
}
