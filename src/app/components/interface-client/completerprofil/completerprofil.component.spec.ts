import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleterprofilComponent } from './completerprofil.component';

describe('CompleterprofilComponent', () => {
  let component: CompleterprofilComponent;
  let fixture: ComponentFixture<CompleterprofilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleterprofilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleterprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
