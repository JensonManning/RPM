import { AppUserDetail } from "../appUser/appUserDetail";
import { ProjectPhase } from "../phases/projectPhase";

export interface ProjectTasks {
    projectTasksID: number;
    projectTasksName: string;
    projectTasksDescription: string;
    projectTasksStartDate: string;
    projectTasksEndDate: string;
    projectTasksStatus: string;
    projectID: number;
    projectName: string;
    projectPhase: string;
    projectPhaseID: number;
    appUsers: Array<AppUserDetail>;
    projectTaskActions: ProjectTaskActions;
}

export interface CreateProjectTasks {
    projectTasksID: number;
    projectTasksName: string;
    projectTasksDescription: string;
    projectTasksStartDate: string;
    projectTasksEndDate: string;
    projectTasksStatus: string;
    projectID: number;
    projectPhase: Array<ProjectPhase>;
    projectPhaseID: number;
    appUsers: Array<AppUserDetail>;
}

export interface ProjectTaskActions {
    view : any, 
    edit : any,
    delete : any
}