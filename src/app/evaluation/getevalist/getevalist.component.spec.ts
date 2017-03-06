/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GetevalistComponent } from './getevalist.component';

describe('GetevalistComponent', () => {
  let component: GetevalistComponent;
  let fixture: ComponentFixture<GetevalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetevalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetevalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
