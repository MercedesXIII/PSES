/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvaformComponent } from './evaform.component';

describe('EvaformComponent', () => {
  let component: EvaformComponent;
  let fixture: ComponentFixture<EvaformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
