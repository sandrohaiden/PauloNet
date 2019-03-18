import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechamentoPage } from './fechamento.page';

describe('FechamentoPage', () => {
  let component: FechamentoPage;
  let fixture: ComponentFixture<FechamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
