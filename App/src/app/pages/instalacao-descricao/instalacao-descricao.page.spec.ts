import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacaoDescricaoPage } from './instalacao-descricao.page';

describe('InstalacaoDescricaoPage', () => {
  let component: InstalacaoDescricaoPage;
  let fixture: ComponentFixture<InstalacaoDescricaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalacaoDescricaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalacaoDescricaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
