export class Collegue {
		
	constructor(private _pseudo:string, private _url:string, private _score:number=10){
	}
	
	get pseudo():string {
		return this._pseudo;
	}
	
	set pseudo(pseudo:string){
		this._pseudo = pseudo;
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
	
	toString():string{
		return `{"pseudo": "${this.pseudo}", "url": "${this.url}", "score":"${this.score}"}`
	}
	
}
