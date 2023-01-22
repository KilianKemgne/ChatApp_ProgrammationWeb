import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeVerifyComponent } from './codeVerify.component';

describe('CodeVerifyComponent', () => {
  let component: CodeVerifyComponent;
  let fixture: ComponentFixture<CodeVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
