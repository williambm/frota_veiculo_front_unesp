import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagemListComponent } from './viagem-list.component';

describe('ViagemListComponent', () => {
  let component: ViagemListComponent;
  let fixture: ComponentFixture<ViagemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViagemListComponent]
    });
    fixture = TestBed.createComponent(ViagemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
