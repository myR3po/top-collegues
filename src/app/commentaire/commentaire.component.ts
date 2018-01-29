import { Component, OnInit, Input } from '@angular/core'
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap'

import { Collegue } from './../shared/domain/collegue'
import { CollegueService } from '../shared/service/collegue.service'

import { Opinion } from './../shared/domain/opinion'
import { CommentaireService } from '../shared/service/commentaire.service'

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {
	@Input()
	private collegue:Collegue
	
	private opinion:Opinion = new Opinion()
	
	private canDisableButton:boolean = false
	
	private modalRef:NgbModalRef
	
	constructor(private modalService: NgbModal, private collegueService:CollegueService, private commentaireService:CommentaireService) { }

	ngOnInit() {
		this.collegueService.getStatus().subscribe(online => {
			this.canDisableButton = !online
		})
	}

	open(content) {
		this.modalRef = this.modalService.open(content)
	}
	
	submit(){
		this.opinion.collegue = this.collegue
		let commentaire = {
				commentaire:this.opinion.commentaire,
				pseudo : this.collegue.pseudo
		}
		this.commentaireService.sauvegarder(commentaire)
		this.modalRef.close()
	}
	
}
