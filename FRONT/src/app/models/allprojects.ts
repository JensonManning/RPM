import { AppUserDetail } from './appUser/appUserDetail';
import { ProjectPhase } from './phases/projectPhase';
import { ProjectTasks } from './tasks/projectTasks';
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