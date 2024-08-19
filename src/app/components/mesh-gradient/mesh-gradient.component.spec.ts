import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshGradientComponent } from './mesh-gradient.component';

describe('MeshGradientComponent', () => {
  let component: MeshGradientComponent;
  let fixture: ComponentFixture<MeshGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeshGradientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeshGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
