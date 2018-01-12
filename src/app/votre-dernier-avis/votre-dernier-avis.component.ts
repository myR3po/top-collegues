import { Component, OnInit } from '@angular/core'

import { AvisService } from '../shared/service/avis.service'

import { Avis } from './../shared/domain/avis'
import { Vote } from '../shared/domain/vote'

@Component({
  selector: 'app-votre-dernier-avis',
  templateUrl: './votre-dernier-avis.component.html',
  styleUrls: ['./votre-dernier-avis.component.css']
})
export class VotreDernierAvisComponent implements OnInit {
	
	private message:string
	private typeMessage:string = 'dark'
	
	constructor(private avisService:AvisService) { 
		
	}

	ngOnInit() {
		this.avisService.getAvisMessage().subscribe(newVote => {
		
			if(newVote.avis == null){
				this.message = 'Aucun vote'
				this.typeMessage = 'dark'
			}
			else if(newVote.avis === Avis.DISLIKE){
				this.message = 'je n\'aime pas ' + newVote.collegue.pseudo
				this.typeMessage = 'danger'
			}else if(newVote.avis === Avis.LIKE){
				this.message = 'j\'aime ' + newVote.collegue.pseudo
				this.typeMessage = 'success'
			}
		})
	}

}
