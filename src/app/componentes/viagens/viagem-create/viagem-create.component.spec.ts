import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagemCreateComponent } from './viagem-create.component';

describe('ViagemCreateComponent', () => {
  let component: ViagemCreateComponent;
  let fixture: ComponentFixture<ViagemCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViagemCreateComponent]
    });
    fixture = TestBed.createComponent(ViagemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
