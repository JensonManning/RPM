import { ProjectPhase } from "./projectPhase";

export interface ProjectTasks {
    projectTasksID: number;
    projectTasksName: string;
    projectTasksDescription: string;
    projectTasksStartDate: string;
    projectTasksEndDate: string;
    projectTasksStatus: string;
    projectID: number;
    projectPhase: Array<ProjectPhase>;
    projectPhaseID: number;
}