import { Component, OnInit, Input } from '@angular/core';
import { Collegue } from './../shared/domain/collegue';
import { Avis } from './../shared/domain/avis';

@Component({
  selector: 'app-un-collegue',
  templateUrl: './un-collegue.component.html',
  styleUrls: ['./un-collegue.component.css']
})
export class UnCollegueComponent implements OnInit {

	@Input() collegue:Collegue;

	constructor() { }

	ngOnInit() {
	}
  
	setOpinion(event) {

		if(event === Avis.LIKE){
			this.collegue.score += 10
		}else{
			this.collegue.score -= 5
		}
		
	}
  
  

}
