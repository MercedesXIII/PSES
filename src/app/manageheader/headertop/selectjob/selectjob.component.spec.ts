/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectjobComponent } from './selectjob.component';

describe('SelectjobComponent', () => {
  let component: SelectjobComponent;
  let fixture: ComponentFixture<SelectjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
