import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemCreateComponent } from './imagem-create.component';

describe('ImagemCreateComponent', () => {
  let component: ImagemCreateComponent;
  let fixture: ComponentFixture<ImagemCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagemCreateComponent]
    });
    fixture = TestBed.createComponent(ImagemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
