import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoEditComponent } from './veiculo-edit.component';

describe('VeiculoEditComponent', () => {
  let component: VeiculoEditComponent;
  let fixture: ComponentFixture<VeiculoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeiculoEditComponent]
    });
    fixture = TestBed.createComponent(VeiculoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
