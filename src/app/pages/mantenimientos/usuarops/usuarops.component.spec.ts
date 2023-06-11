import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuaropsComponent } from './usuarops.component';

describe('UsuaropsComponent', () => {
  let component: UsuaropsComponent;
  let fixture: ComponentFixture<UsuaropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuaropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuaropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
