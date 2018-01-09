import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Avis } from './../shared/domain/avis';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

	@Output() opinion:EventEmitter<Avis> = new EventEmitter<Avis>()

	constructor() { }

	ngOnInit() {
	}
  
	jaime() {
		this.opinion.emit(Avis.LIKE)
	}
	
	jedeteste() {
		this.opinion.emit(Avis.DISLIKE)		
	}


}
