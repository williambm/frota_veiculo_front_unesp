import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagensEstatisticasComponent } from './viagens-estatisticas.component';

describe('ViagensEstatisticasComponent', () => {
  let component: ViagensEstatisticasComponent;
  let fixture: ComponentFixture<ViagensEstatisticasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViagensEstatisticasComponent]
    });
    fixture = TestBed.createComponent(ViagensEstatisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
