import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsAssignment } from './projects-assignment';

describe('ProjectsAssignment', () => {
  let component: ProjectsAssignment;
  let fixture: ComponentFixture<ProjectsAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAssignment],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsAssignment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
