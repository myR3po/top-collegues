import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { UnCollegueComponent } from './un-collegue/un-collegue.component';
import { OpinionComponent } from './opinion/opinion.component';

import { CollegueService } from './shared/service/collegue.service';
import { AvisService } from './shared/service/avis.service';

import { ClassiqueComponent } from './classique/classique.component';
import { TableauComponent } from './tableau/tableau.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { ScorePipe } from './shared/pipe/score.pipe';
import { FiltreByPseudoPipe } from './shared/pipe/filtre-by-pseudo.pipe';
import { VotreDernierAvisComponent } from './votre-dernier-avis/votre-dernier-avis.component';


const appRoutes: Routes = [
{ path: 'classique', component: ClassiqueComponent},
{ path: 'tableau', component: TableauComponent },
{ path: 'carrousel', component: CarrouselComponent },
{ path: 'detail/:pseudo', component: PageDetailComponent },
{ path: '**', redirectTo: 'classique'}
];

@NgModule({
  declarations: [
    AppComponent,
    UnCollegueComponent,
    OpinionComponent,
    ClassiqueComponent,
    TableauComponent,
    CarrouselComponent,
    PageDetailComponent,
    ScorePipe,
    FiltreByPseudoPipe,
    VotreDernierAvisComponent
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	NgbModule.forRoot(),
	RouterModule.forRoot(appRoutes)
  ],
  providers: [CollegueService, AvisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
