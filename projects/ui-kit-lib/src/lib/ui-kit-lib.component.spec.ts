import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiKitLibComponent } from './ui-kit-lib.component';

describe('UiKitLibComponent', () => {
  let component: UiKitLibComponent;
  let fixture: ComponentFixture<UiKitLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiKitLibComponent]
    });
    fixture = TestBed.createComponent(UiKitLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
