import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteHistoriqueComponent } from './vote-historique.component';

describe('VoteHistoriqueComponent', () => {
  let component: VoteHistoriqueComponent;
  let fixture: ComponentFixture<VoteHistoriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteHistoriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
