import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodeComponent } from './promocode.component';

describe('PromocodeComponent', () => {
  let component: PromocodeComponent;
  let fixture: ComponentFixture<PromocodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromocodeComponent]
    });
    fixture = TestBed.createComponent(PromocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
