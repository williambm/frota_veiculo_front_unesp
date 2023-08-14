import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDeleteComponent } from './funcionario-delete.component';

describe('FuncionarioDeleteComponent', () => {
  let component: FuncionarioDeleteComponent;
  let fixture: ComponentFixture<FuncionarioDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioDeleteComponent]
    });
    fixture = TestBed.createComponent(FuncionarioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
