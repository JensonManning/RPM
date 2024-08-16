import { Phases } from './phases';
export interface AllProjects {
    map(arg0: (project: { projectsName: any; }) => any): string[];
    projectsID: number;
    projectsName: string;
    projectsShortcode: string;
    projectsDescription: string;
    projectsStartDate: string;
    projectsEndDate: string;
    projectsStatus: string;
    phases: Array<Phases>;
}