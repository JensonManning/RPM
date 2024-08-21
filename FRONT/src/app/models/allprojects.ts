import { AppUserDetail } from './appUserDetail';
import { ProjectPhase } from './projectPhase';
import { ProjectTasks } from './projectTasks';
import { ProjectTeam } from './projectTeam';
export interface AllProjects {
    map(arg0: (project: { projectsName: any; }) => any): string[];
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: Array<ProjectPhase>;
    projectTasks: Array<ProjectTasks>;
    appUsers: Array<AppUserDetail>;
}