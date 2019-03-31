import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoDescricaoPage } from './chamado-descricao.page';

describe('DescricaoPage', () => {
  let component: ChamadoDescricaoPage;
  let fixture: ComponentFixture<ChamadoDescricaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadoDescricaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadoDescricaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
