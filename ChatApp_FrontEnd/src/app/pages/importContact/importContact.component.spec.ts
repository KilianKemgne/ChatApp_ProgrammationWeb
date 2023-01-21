import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContactComponent } from './importContact.component';

describe('DashboardComponent', () => {
  let component: ImportContactComponent;
  let fixture: ComponentFixture<ImportContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
