import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalform } from './modalform';

describe('Modalform', () => {
  let component: Modalform;
  let fixture: ComponentFixture<Modalform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modalform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
