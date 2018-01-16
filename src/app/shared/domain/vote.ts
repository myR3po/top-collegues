import { Collegue } from '../domain/collegue'
import { Avis } from '../domain/avis'

export class Vote {
	constructor(public id:number, public collegue:Collegue, public avis:Avis){
	}
}
