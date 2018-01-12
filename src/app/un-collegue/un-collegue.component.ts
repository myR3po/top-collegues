import { Component, OnInit, Input } from '@angular/core';

import { Collegue } from './../shared/domain/collegue';
import { Avis } from './../shared/domain/avis'

import { CollegueService } from './../shared/service/collegue.service';

@Component({
  selector: 'app-un-collegue',
  templateUrl: './un-collegue.component.html',
  styleUrls: ['./un-collegue.component.css']
})
export class UnCollegueComponent implements OnInit {

	@Input() collegue:Collegue;

	constructor(private collegueService:CollegueService){}

	ngOnInit() {
	}
  
	setOpinion(event, collegue:Collegue) {

		if(event === Avis.LIKE){
			this.collegueService.aimerUnCollegue(this.collegue)
				.subscribe(collegueFromService => {
					this.collegue.score = collegueFromService.score
				})
		}else{
			this.collegueService.detesterUnCollegue(this.collegue)
				.subscribe(collegueFromService => {
					this.collegue.score = collegueFromService.score
				})
		}	
	}
  
  

}
