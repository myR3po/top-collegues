import { Component } from '@angular/core'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks'

import { Collegue } from './shared/domain/collegue'
import { CollegueService } from './shared/service/collegue.service'
import { FiltreService } from './shared/service/filtre.service'


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
		
	constructor(private collegueService:CollegueService, private filtreService:FiltreService){}
	
	ngOnInit() {
		this.collegueService.getStatus().subscribe(online => {
			this.canDisableButton = !online
		})
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