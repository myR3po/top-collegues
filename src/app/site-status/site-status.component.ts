import { Component, OnInit } from '@angular/core'

import { CollegueService } from '../shared/service/collegue.service'
@Component({
  selector: 'app-site-status',
  templateUrl: './site-status.component.html',
  styleUrls: ['./site-status.component.css']
})
export class SiteStatusComponent implements OnInit {

	private statusMessage:string = 'online'
	private colorStatus:string = 'success'
	
  constructor(private collegueService:CollegueService) { }

  ngOnInit() {
		this.collegueService.getStatus().subscribe(online => {
			if(online){
				this.statusMessage = 'online'
				this.colorStatus = 'success'
			}else{
				this.statusMessage = 'offline'
				this.colorStatus = 'danger'
			}
		})
  }

}
