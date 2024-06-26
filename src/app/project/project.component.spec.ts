import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponentComponent } from './project.component';

describe('ProjectComponentComponent', () => {
  let component: ProjectComponentComponent;
  let fixture: ComponentFixture<ProjectComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectComponentComponent]
    });
    fixture = TestBed.createComponent(ProjectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
