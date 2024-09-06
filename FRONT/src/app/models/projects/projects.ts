import { AppUserDetail } from "../appUser/appUserDetail";
import { ProjectPhase } from "../phases/projectPhase";
import { ProjectTasks } from "../tasks/projectTasks";

export interface AllProjects {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];
};

export interface Project {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];
}


export interface CreatedProjects {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];
};

export interface ActiveProjects {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];
};

export interface UpcomingProjects {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];
};

export interface CompletedProjects {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];
};

export interface ArchivedProjects {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];
};

export interface DelayedProjects {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];
};

export interface ProjectDetails {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
};

export interface UserProjects {
    projectID: number;
    projectName: string;
    projectShortcode: string;
    projectDescription: string;
    projectStartDate: string;
    projectEndDate: string;
    projectStatus: string;
    projectPhase: ProjectPhase[];
    projectTasks: ProjectTasks[];
    appUsers: AppUserDetail[];   
}

