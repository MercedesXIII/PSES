/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvalistComponent } from './evalist.component';

describe('EvalistComponent', () => {
  let component: EvalistComponent;
  let fixture: ComponentFixture<EvalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
