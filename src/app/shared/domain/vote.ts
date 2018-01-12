import { Collegue } from '../domain/collegue'
import { Avis } from '../domain/avis'

export class Vote {
	constructor(public collegue:Collegue, public avis:Avis){
	}
}
