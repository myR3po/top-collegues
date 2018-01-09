export class Collegue {
		
	constructor(private _nom:string, private _url:string, private _score:number=10){
	}
	
	get nom():string {
		return this._nom;
	}
	
	set nom(nom:string){
		this._nom = nom;
	}
	
	get url():string {
		return this._url;
	}
	
	set url(url:string){
		this._url = url;
	}
	
	get score():number {
		return this._score;
	}
	
	set score(score:number) {
		this._score = score;
	}
}
