import { Component, input, output } from '@angular/core';
import { AllProjects } from '../models/allprojects';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects = input.required<AllProjects[]>();
  selectProject = output<AllProjects>();

  onSelectProject(project: AllProjects) {
    this.selectProject.emit(project);
  }
  
}
