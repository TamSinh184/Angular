import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamponComponent } from './tampon.component';

describe('TamponComponent', () => {
  let component: TamponComponent;
  let fixture: ComponentFixture<TamponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
