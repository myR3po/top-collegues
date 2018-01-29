import { Component } from '@angular/core'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks'

import { Collegue } from './shared/domain/collegue'
import { CollegueService } from './shared/service/collegue.service'
import { FiltreService } from './shared/service/filtre.service'

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap'

import { Opinion } from './shared/domain/opinion'
import { CommentaireService } from './shared/service/commentaire.service'

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	private message: string
	private opened:boolean
	private canDismiss:boolean = true
	private typeMessage:string
	
	private canDisableButton:boolean = false
	
	
	private opinion:Opinion = new Opinion()	
	private modalRef:NgbModalRef
	
	private listeAvis:Array<string> = ['Mauvais', 'Bien', 'Excellent']	
	private monForm: FormGroup
	
	constructor(private fb: FormBuilder, private modalService: NgbModal, private collegueService:CollegueService, private filtreService:FiltreService, private commentaireService:CommentaireService){

		this.monForm = this.fb.group({
			avis: new FormControl('', Validators.required),
			suggestion : new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(255)]), 
		});
	}
	
	ngOnInit() {
		this.collegueService.getStatus().subscribe(online => {
			this.canDisableButton = !online
		})
	}
	
	open(content) {
		this.modalRef = this.modalService.open(content)
	}
	
	submit(){
		let avis = this.monForm.get('avis').value
		let suggestion = this.monForm.get('suggestion').value
		
		let commentaire = {
				commentaire: avis,
				suggestion : suggestion
		}
		
		console.log('{"avis" : "'+ avis +'", "suggestion" : "'+suggestion+'"}' )
		
		this.commentaireService.sauvegarder(commentaire)
		this.modalRef.close()
	}
	
	changeLimite(newLimite){
		this.filtreService.updateLimite(newLimite)
	}
	
	changePseudoToFilter(pseudo:string){
		this.filtreService.updatePseudoToFilter(pseudo)
	}
	
	add(pseudo:HTMLInputElement, imageUrl: HTMLInputElement) {
		let c:Collegue =  new Collegue(0,pseudo.value, imageUrl.value);
		
		this.collegueService.sauvegarder(c)
		this.message = `Le collègue ${pseudo.value} a été ajouté avec succès.`
		this.typeMessage = "success"
		this.opened = true
		
		setTimeout(() => this.opened = false, 20000)
		
		pseudo.value = ''
		imageUrl.value = ''
		
		return false;
	}	

}