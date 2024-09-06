import { NgFor, JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxEditorModule, Editor, Toolbar, Validators } from 'ngx-editor';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project';
import { ProjectPhase } from '../../models/phases/projectPhase';
import { ProjectTasks } from '../../models/tasks/projectTasks';
import { DateTime } from "luxon";
import { Users } from '../../models/appUser/users';
import { AppUserDetail } from '../../models/appUser/appUserDetail';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [NgFor, MatStepperModule, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    ReactiveFormsModule, FileUploadModule, NgxEditorModule, JsonPipe],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
]   
})
export class CreateProjectComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

readonly range = new FormGroup({
    start: new FormControl<string>(DateTime.now().toLocaleString()),
    end: new FormControl<Date | null>(null),
  });

users : AppUserDetail[] = [{
    id: '',
    email: '',
    fullName: '',
    roles: [],
    phoneNumber: '',
    phoneNumberConfirmed: false,
    twoFactorEnabled: false,
    accessFailedCount: 0,
  
}];

project : Project = {
    projectID: 0,
    projectName: '',
    projectShortcode: '',
    projectDescription: '',
    projectStartDate: '',
    projectEndDate: '',
    projectStatus: 'Created'
};

cPhases : ProjectPhase[] = [
    {
        projectPhaseID: 0,
        projectPhaseName: '',
        projectPhaseDescription: '',
        projectPhaseStartDate: '',
        projectPhaseEndDate: '',
        projectPhaseStatus: '',
        projectID: 0
    },
    {
      projectPhaseID: 0,
      projectPhaseName: '',
      projectPhaseDescription: '',
      projectPhaseStartDate: '',
      projectPhaseEndDate: '',
      projectPhaseStatus: '',
      projectID: 0
    },
    {
      projectPhaseID: 0,
      projectPhaseName: '',
      projectPhaseDescription: '',
      projectPhaseStartDate: '',
      projectPhaseEndDate: '',
      projectPhaseStatus: '',
      projectID: 0
    },
    {
      projectPhaseID: 0,
      projectPhaseName: '',
      projectPhaseDescription: '',
      projectPhaseStartDate: '',
      projectPhaseEndDate: '',
      projectPhaseStatus: '',
      projectID: 0 
    },
    {
      projectPhaseID: 0,
      projectPhaseName: '',
      projectPhaseDescription: '',
      projectPhaseStartDate: '',
      projectPhaseEndDate: '',
      projectPhaseStatus: '',
      projectID: 0
    },
    {
      projectPhaseID: 0,
      projectPhaseName: '',
      projectPhaseDescription: '',
      projectPhaseStartDate: '',
      projectPhaseEndDate: '',
      projectPhaseStatus: '',
      projectID: 0
    }

]

projectTasks : ProjectTasks[] = [
    {
        projectTasksID: 0,
        projectTasksName: '',
        projectTasksDescription: '',
        projectTasksStartDate: '',
        projectTasksEndDate: '',
        projectTasksStatus: '',
        projectID: 0,
        projectPhaseID: 0,
        projectPhase: [],
        appUsers: []
    },
    {
        projectTasksID: 0,
        projectTasksName: '',
        projectTasksDescription: '',
        projectTasksStartDate: '',
        projectTasksEndDate: '',
        projectTasksStatus: '',
        projectID: 0,
        projectPhaseID: 0,
        projectPhase: [],
        appUsers: []
    },
    {
        projectTasksID: 0,
        projectTasksName: '',
        projectTasksDescription: '',
        projectTasksStartDate: '',
        projectTasksEndDate: '',
        projectTasksStatus: '',
        projectID: 0,
        projectPhaseID: 0,
        projectPhase: [],
        appUsers: []
    },
    {
        projectTasksID: 0,
        projectTasksName: '',
        projectTasksDescription: '',
        projectTasksStartDate: '',
        projectTasksEndDate: '',
        projectTasksStatus: '',
        projectID: 0,
        projectPhaseID: 0,
        projectPhase: [],
        appUsers: []
    },
    {
        projectTasksID: 0,
        projectTasksName: '',
        projectTasksDescription: '',
        projectTasksStartDate: '',
        projectTasksEndDate: '',
        projectTasksStatus: '',
        projectID: 0,
        projectPhaseID: 0,
        projectPhase: [],
        appUsers: []
    },
    {
        projectTasksID: 0,
        projectTasksName: '',
        projectTasksDescription: '',
        projectTasksStartDate: '',
        projectTasksEndDate: '',
        projectTasksStatus: '',
        projectID: 0,
        projectPhaseID: 0,
        projectPhase: [],
        appUsers: []
    }
]
// projectPhase ID
projectPhaseOneID: number = 0;
projectPhaseTwoID: number = 0;
projectPhaseThreeID: number = 0;
projectPhaseFourID: number = 0;
projectPhaseFiveID: number = 0;
projectPhaseSixID: number = 0;
projectPhaseSevenID: number = 0;

// projectID for projectPhase
projectPhaseProjectID: number = 0;
projectPhaseProjectID1: number = 0;
projectPhaseProjectID2: number = 0;
projectPhaseProjectID3: number = 0;
projectPhaseProjectID4: number = 0;
projectPhaseProjectID5: number = 0;
projectPhaseProjectID6: number = 0;


// projectPhase dates for auto generation
projectPhaseOneStartDate: string = Date.toString();
projectPhaseOneEndDate: string = Date.toString();
projectStart = new Date().toISOString();
projectEnd = new Date().toISOString();
projectEndOne = new Date();
projectEndOneISO = new Date().toISOString();
// 2
projectPhaseTwoStartDate: string = Date.toString();
projectPhaseTwoEndDate: string = Date.toString();
projectStartTwo = new Date();
projectStartTwoISO = new Date().toISOString();
projectEndTwo = new Date();
projectEndTwoISO = new Date().toISOString();
// 3
projectPhaseThreeStartDate: string = Date.toString();
projectPhaseThreeEndDate: string = Date.toString();
projectStartThree = new Date();
projectStartThreeISO = new Date().toISOString();
projectEndThree = new Date();
projectEndThreeISO = new Date().toISOString();
// 4
projectPhaseFourStartDate: string = Date.toString();
projectPhaseFourEndDate: string = Date.toString();
projectStartFour = new Date();
projectStartFourISO = new Date().toISOString();
projectEndFour = new Date();
projectEndFourISO = new Date().toISOString();
// 5
projectPhaseFiveStartDate: string = Date.toString();
projectPhaseFiveEndDate: string = Date.toString();
projectStartFive = new Date();
projectStartFiveISO = new Date().toISOString();
projectEndFive = new Date();
projectEndFiveISO = new Date().toISOString();
// 6
projectPhaseSixStartDate: string = Date.toString();
projectPhaseSixEndDate: string = Date.toString();
projectStartSix = new Date();
projectStartSixISO = new Date().toISOString();
projectEndSix = new Date();
projectEndSixISO = new Date().toISOString();

onChangeStart(event: any) {
    this.projectStart = event.value.toISOString().slice(0, 10);
    this.project.projectStartDate = this.projectStart.toString();
    this.projectPhaseOneStartDate = this.projectStart;
    console.log("projectStart: " + this.projectPhaseOneStartDate);

    // PHASE TWO GET START DATE
    this.projectStartTwo = new Date(event.value.toISOString().slice(0, 10));
    this.projectStartTwo = new Date(this.projectStartTwo.setDate(this.projectStartTwo.getDate() + 7));
    this.projectStartTwoISO = this.projectStartTwo.toISOString().slice(0, 10);
    this.projectPhaseTwoStartDate = this.projectStartTwoISO;
    console.log("projectStartTwoISO: " + this.projectPhaseTwoStartDate);

    // PHASE THREE GET START DATE
    this.projectStartThree = new Date(event.value.toISOString().slice(0, 10));
    this.projectStartThree = new Date(this.projectStartThree.setDate(this.projectStartThree.getDate() + 14));
    this.projectStartThreeISO = this.projectStartThree.toISOString().slice(0, 10);
    this.projectPhaseThreeStartDate = this.projectStartThreeISO;
    console.log("projectStartThreeISO: " + this.projectPhaseThreeStartDate);

    // PHASE FOUR GET START DATE
    this.projectStartFour = new Date(event.value.toISOString().slice(0, 10));
    this.projectStartFour = new Date(this.projectStartFour.setDate(this.projectStartFour.getDate() + 21));
    this.projectStartFourISO = this.projectStartFour.toISOString().slice(0, 10);
    this.projectPhaseFourStartDate = this.projectStartFourISO;
    console.log("projectStartFourISO: " + this.projectPhaseFourStartDate);

    // PHASE FIVE GET START DATE
    this.projectStartFive = new Date(event.value.toISOString().slice(0, 10));
    this.projectStartFive = new Date(this.projectStartFive.setDate(this.projectStartFive.getDate() + 28));
    this.projectStartFiveISO = this.projectStartFive.toISOString().slice(0, 10);
    this.projectPhaseFiveStartDate = this.projectStartFiveISO;
    console.log("projectStartFiveISO: " + this.projectPhaseFiveStartDate);

    // PHASE SIX GET START DATE
    this.projectStartSix = new Date(event.value.toISOString().slice(0, 10));
    this.projectStartSix = new Date(this.projectStartSix.setDate(this.projectStartSix.getDate() + 35));
    this.projectStartSixISO = this.projectStartSix.toISOString().slice(0, 10);
    this.projectPhaseSixStartDate = this.projectStartSixISO;
    console.log("projectStartSixISO: " + this.projectPhaseSixStartDate);

    // PHASE ONE GET END DATE
    this.projectEndOne = new Date(event.value.toISOString().slice(0, 10));
    this.projectEndOne = new Date(this.projectEndOne.setDate(this.projectEndOne.getDate() + 5));
    this.projectEndOneISO = this.projectEndOne.toISOString().slice(0, 10);
    this.projectPhaseOneEndDate = this.projectEndOneISO;
    console.log("projectEndOneISO: " + this.projectPhaseOneEndDate);

    // PHASE TWO GET END DATE
    this.projectEndTwo = new Date(event.value.toISOString().slice(0, 10));
    this.projectEndTwo = new Date(this.projectEndTwo.setDate(this.projectEndTwo.getDate() + 12));
    this.projectEndTwoISO = this.projectEndTwo.toISOString().slice(0, 10);
    this.projectPhaseTwoEndDate = this.projectEndTwoISO;
    console.log("projectEndTwoISO: " + this.projectPhaseTwoEndDate);

    // PHASE THREE GET END DATE
    this.projectEndThree = new Date(event.value.toISOString().slice(0, 10));
    this.projectEndThree = new Date(this.projectEndThree.setDate(this.projectEndThree.getDate() + 19));
    this.projectEndThreeISO = this.projectEndThree.toISOString().slice(0, 10);
    this.projectPhaseThreeEndDate = this.projectEndThreeISO;
    console.log("projectEndThreeISO: " + this.projectPhaseThreeEndDate);

    // PHASE FOUR GET END DATE
    this.projectEndFour = new Date(event.value.toISOString().slice(0, 10));
    this.projectEndFour = new Date(this.projectEndFour.setDate(this.projectEndFour.getDate() + 26));
    this.projectEndFourISO = this.projectEndFour.toISOString().slice(0, 10);
    this.projectPhaseFourEndDate = this.projectEndFourISO;
    console.log("projectEndFourISO: " + this.projectPhaseFourEndDate);

    // PHASE FIVE GET END DATE
    this.projectEndFive = new Date(event.value.toISOString().slice(0, 10));
    this.projectEndFive = new Date(this.projectEndFive.setDate(this.projectEndFive.getDate() + 33));
    this.projectEndFiveISO = this.projectEndFive.toISOString().slice(0, 10);
    this.projectPhaseFiveEndDate = this.projectEndFiveISO;
    console.log("projectEndFiveISO: " + this.projectPhaseFiveEndDate);

    // PHASE SIX GET END DATE
    this.projectEndSix = new Date(event.value.toISOString().slice(0, 10));
    this.projectEndSix = new Date(this.projectEndSix.setDate(this.projectEndSix.getDate() + 40));
    this.projectEndSixISO = this.projectEndSix.toISOString().slice(0, 10);
    this.projectPhaseSixEndDate = this.projectEndSixISO;
    console.log("projectEndSixISO: " + this.projectPhaseSixEndDate);

    this.projectEnd = this.projectPhaseSixEndDate;
    this.project.projectEndDate = this.projectEnd;

}

getUsers() {
    this.projectService.getUsers().subscribe(data => {
        this.users = data;
        console.log(this.users);
    })
}

@ViewChild('picker') picker: any;
editor: Editor;
toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
];

// File Uploader
public multiple: boolean = false;

// isToggled
isToggled = false;

constructor(
    private projectService: ProjectsService, public themeService: CustomizerSettingsService, 
        public _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.themeService.isToggled$.subscribe(isToggled => {
        this.isToggled = isToggled;
    });
    this.editor = new Editor();
}

ngOnInit(): void {
    this.editor = new Editor();
    return this.getUsers();
}

// make sure to destory the editor
ngOnDestroy(): void {
    this.editor.destroy();
}

// RTL Mode
toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
}

onSubmit() : void {
    this.projectService.createProjects(this.project)
    .subscribe({ 
        next: (result) => {
            timeout(10000);
            console.log(result);
            
            this.projectPhaseProjectID = result.projectID;
            console.log('OUR Project ID : ' + this.projectPhaseProjectID);
            this.projectPhaseProjectID1 = result.projectID;
            console.log(' 1 Project ID : ' + this.projectPhaseProjectID1);
            this.projectPhaseProjectID2 = result.projectID;
            console.log(' 2 Project ID : ' + this.projectPhaseProjectID2);
            this.projectPhaseProjectID3 = result.projectID;
            console.log(' 3 Project ID : ' + this.projectPhaseProjectID3);
            this.projectPhaseProjectID4 = result.projectID;
            console.log(' 4 Project ID : ' + this.projectPhaseProjectID4);
            this.projectPhaseProjectID5 = result.projectID;
            console.log(' 5 Project ID : ' + this.projectPhaseProjectID5);
            this.projectPhaseProjectID6 = result.projectID;
            console.log(' 6 Project ID : ' + this.projectPhaseProjectID6);

            // PHASE ONE

            this.cPhases[0].projectID = this.projectPhaseProjectID1;
            this.cPhases[0].projectPhaseStatus = "Active";
            this.cPhases[0].projectPhaseID = 0;
            this.cPhases[0].projectPhaseStartDate = this.projectPhaseOneStartDate;
            this.cPhases[0].projectPhaseEndDate = this.projectPhaseOneEndDate; 
            this.cPhases[0].projectPhaseDescription = 'This is week 1 test';
            this.cPhases[0].projectPhaseName = 'Week 1';              
            console.log('cPhases[0].projectID : ' + this.cPhases[0].projectID);

            // PHASE TWO
            this.cPhases[1].projectID = this.projectPhaseProjectID2;
            this.cPhases[1].projectPhaseStatus = "InActive";
            this.cPhases[1].projectPhaseID = 1;
            this.cPhases[1].projectPhaseStartDate = this.projectPhaseTwoStartDate;
            this.cPhases[1].projectPhaseEndDate = this.projectPhaseTwoEndDate; 
            this.cPhases[1].projectPhaseDescription = 'This is week 2 test';
            this.cPhases[1].projectPhaseName = 'Week 2';
            console.log('cPhases[1].projectID : ' + this.cPhases[1].projectID);


            // PHASE THREE
            this.cPhases[2].projectID = this.projectPhaseProjectID3;
            this.cPhases[2].projectPhaseStatus = "InActive";
            this.cPhases[2].projectPhaseID = 2;
            this.cPhases[2].projectPhaseStartDate = this.projectPhaseThreeStartDate;
            this.cPhases[2].projectPhaseEndDate = this.projectPhaseThreeEndDate; 
            this.cPhases[2].projectPhaseDescription = 'This is week 3 test';
            this.cPhases[2].projectPhaseName = 'Week 3';
            console.log('cPhases[2].projectID : ' + this.cPhases[2].projectID);

            // PHASE FOUR
            this.cPhases[3].projectID = this.projectPhaseProjectID4;
            this.cPhases[3].projectPhaseStatus = "InActive";
            this.cPhases[3].projectPhaseID = 3;
            this.cPhases[3].projectPhaseStartDate = this.projectPhaseFourStartDate;
            this.cPhases[3].projectPhaseEndDate = this.projectPhaseFourEndDate; 
            this.cPhases[3].projectPhaseDescription = 'This is week 4 test';
            this.cPhases[3].projectPhaseName = 'Week 4';
            console.log('cPhases[3].projectID : ' + this.cPhases[3].projectID);

            // PHASE FIVE
            this.cPhases[4].projectID = this.projectPhaseProjectID5;
            this.cPhases[4].projectPhaseStatus = "InActive";
            this.cPhases[4].projectPhaseID = 4;
            this.cPhases[4].projectPhaseStartDate = this.projectPhaseFiveStartDate;
            this.cPhases[4].projectPhaseEndDate = this.projectPhaseFiveEndDate; 
            this.cPhases[4].projectPhaseDescription = 'This is week 5 test';
            this.cPhases[4].projectPhaseName = 'Week 5';
            console.log('cPhases[4].projectID : ' + this.cPhases[4].projectID);

            // PHASE SIX
            this.cPhases[5].projectID = this.projectPhaseProjectID6;
            this.cPhases[5].projectPhaseStatus = "InActive";
            this.cPhases[5].projectPhaseID = 5;
            this.cPhases[5].projectPhaseStartDate = this.projectPhaseSixStartDate;
            this.cPhases[5].projectPhaseEndDate = this.projectPhaseSixEndDate; 
            this.cPhases[5].projectPhaseDescription = 'This is week 6 test';
            this.cPhases[5].projectPhaseName = 'Week 6';
            console.log('cPhases[5].projectID : ' + this.cPhases[5].projectID);
            console.log("Phase 1 is starting");

                // PHASE ONE CREATION
                this.projectService.createPhases(this.projectPhaseProjectID1, this.cPhases[0]).subscribe({
                    next: (result1) => {
                        console.log("Phase 1 has been created");
                        this.projectPhaseOneID = result1.projectPhaseID;
                            this.projectTasks[0].projectID = this.projectPhaseProjectID1;
                            console.log("Tasks Project ID 1  : " + this.projectPhaseProjectID1);
                            this.projectTasks[0].projectPhaseID = this.projectPhaseOneID;
                            this.projectTasks[0].projectTasksID = 0;
                            this.projectTasks[0].projectTasksName = 'Contact Client';
                            this.projectTasks[0].projectTasksDescription = 'Contact the client';
                            this.projectTasks[0].projectTasksStatus = 'Active';
                            this.projectTasks[0].projectTasksStartDate = this.projectPhaseOneStartDate;
                            this.projectTasks[0].projectTasksEndDate = this.projectPhaseOneEndDate;
                                console.log(' Task Phase ID 0 : ' + this.projectTasks[0].projectPhaseID);
                                this.projectService.createTasks(this.projectPhaseProjectID, this.projectTasks[0]).subscribe({
                                    next : (result) => {
                                        console.log('TASK 1 : ' + result.projectPhaseID);    
                                        console.log('TASK PROJECT ID : ' + result.projectID);          
                                    },
                                    error : (error) => {
                                        console.log(error);
                                    }
                                });
                    
                            this.projectTasks[0].projectID = this.projectPhaseProjectID1;
                            console.log("Tasks Project ID 1  : " + this.projectPhaseProjectID1);
                            this.projectTasks[0].projectPhaseID = this.projectPhaseOneID;
                            this.projectTasks[0].projectTasksID = 1;
                            this.projectTasks[0].projectTasksName = 'Get Testing User Email';
                            this.projectTasks[0].projectTasksDescription = 'Get Testing User Email';
                            this.projectTasks[0].projectTasksStatus = 'Active';
                            this.projectTasks[0].projectTasksStartDate = this.projectPhaseOneStartDate;
                            this.projectTasks[0].projectTasksEndDate = this.projectPhaseOneEndDate;
                                this.projectService.createTasks(this.projectPhaseProjectID, this.projectTasks[0]).subscribe({
                                    next : (result) => {
                                        console.log('TASK 2 : ' + result.projectPhaseID);              
                                    },
                                    error : (error) => {
                                        console.log(error);
                                    }
                                });    
                    },
                    error: (error) => {
                        console.log('Phase 1 creation failed' + error);
                    }   
                });       
               
                // PHASE TWO CREATION
                console.log("Phase 2 is starting");
                this.projectService.createPhases(this.projectPhaseProjectID2, this.cPhases[1]).subscribe({
                    next: (result2) => {
                        console.log("Phase 2 has been created");
                        console.log(result2);
                        this.projectPhaseTwoID = result2.projectPhaseID;
                        this.projectTasks[1].projectID = this.projectPhaseProjectID2;
                        console.log("Tasks Project ID 2  : " + this.projectPhaseProjectID2);
                        this.projectTasks[1].projectPhaseID = this.projectPhaseTwoID;
                        this.projectTasks[1].projectTasksID = 3;
                        this.projectTasks[1].projectTasksName = 'Install Applications';
                        this.projectTasks[1].projectTasksDescription = 'Install Applications';
                        this.projectTasks[1].projectTasksStatus = 'InActive';
                        this.projectTasks[1].projectTasksStartDate = this.projectPhaseTwoStartDate;
                        this.projectTasks[1].projectTasksEndDate = this.projectPhaseTwoEndDate;
                
                        this.projectTasks[1].projectID = this.projectPhaseProjectID2;
                        console.log("Tasks Project ID 2  : " + this.projectPhaseProjectID2);
                        this.projectTasks[1].projectPhaseID = this.projectPhaseTwoID;
                        this.projectTasks[1].projectTasksID = 4;
                        this.projectTasks[1].projectTasksName = 'Update Applications';
                        this.projectTasks[1].projectTasksDescription = 'Update Applications';
                        this.projectTasks[1].projectTasksStatus = 'InActive';
                        this.projectTasks[1].projectTasksStartDate = this.projectPhaseTwoStartDate;
                        this.projectTasks[1].projectTasksEndDate = this.projectPhaseTwoEndDate;
                        this.projectService.createTasks(this.projectPhaseProjectID2, this.projectTasks[1]).subscribe({
                            next : (result) => {
                                console.log('TASK 3 : ' + result.projectPhaseID);              
                            },
                            error : (error) => {
                                console.log(error);
                            }
                        });
                        this.projectService.createTasks(this.projectPhaseProjectID2, this.projectTasks[1]).subscribe({
                            next : (result) => {
                                console.log('TASK 4 : ' + result.projectPhaseID);              
                            },
                            error : (error) => {
                                console.log(error);
                            }
                        });
                    },
                    error: (error) => {
                        console.log('Phase 2 creation failed' + error);
                        console.log(error);
                    }
                });

                // PHASE THREE CREATION
                this.projectService.createPhases(this.projectPhaseProjectID3, this.cPhases[2]).subscribe({
                    next: (result3) => {
                        console.log("Phase 3 has been created");
                        console.log(result3);
                        this.projectPhaseThreeID = result3.projectPhaseID;
                        console.log("projectPhaseThreeID: " + this.projectPhaseThreeID);
                            this.projectTasks[2].projectID = this.projectPhaseProjectID3;
                            console.log("Tasks Project ID 3  : " + this.projectPhaseProjectID3);
                            this.projectTasks[2].projectPhaseID = this.projectPhaseThreeID;
                            this.projectTasks[2].projectTasksID = 5;
                            this.projectTasks[2].projectTasksName = 'App Review';
                            this.projectTasks[2].projectTasksDescription = 'Complete App Review';
                            this.projectTasks[2].projectTasksStatus = 'Active';
                            this.projectTasks[2].projectTasksStartDate = this.projectPhaseThreeStartDate;
                            this.projectTasks[2].projectTasksEndDate = this.projectPhaseThreeEndDate;
                            this.projectService.createTasks(this.projectPhaseProjectID3, this.projectTasks[2]).subscribe({
                                next : (result) => {
                                    console.log('TASK 5 : ' + result.projectPhaseID);              
                                },
                                error : (error) => {
                                    console.log(error);
                                }
                            });
                    },
                    error: (error) => {
                        console.log('Phase 3 creation failed' + error);
                        console.log(error);
                    }
                });
                // PHASE FOUR CREATION
                this.projectService.createPhases(this.projectPhaseProjectID4, this.cPhases[3]).subscribe({
                    next: (result4) => {
                        console.log("Phase 4 has been created");
                        console.log(result4);
                        this.projectPhaseFourID = result4.projectPhaseID;
                        console.log("projectPhaseFourID: " + this.projectPhaseFourID);
                            this.projectTasks[3].projectID = this.projectPhaseProjectID4;
                            console.log("Tasks Project ID 4  : " + this.projectPhaseProjectID4);
                            this.projectTasks[3].projectPhaseID = this.projectPhaseFourID;
                            this.projectTasks[3].projectTasksID = 6;
                            this.projectTasks[3].projectTasksName = 'User Testing Issues Resolved';
                            this.projectTasks[3].projectTasksDescription = 'User Testing Issues Resolved';
                            this.projectTasks[3].projectTasksStatus = 'Active';
                            this.projectTasks[3].projectTasksStartDate = this.projectPhaseFourStartDate;
                            this.projectTasks[3].projectTasksEndDate = this.projectPhaseFourEndDate;
                    
                            this.projectTasks[3].projectID = this.projectPhaseProjectID4;
                            console.log("Tasks Project ID 4  : " + this.projectPhaseProjectID4);
                            this.projectTasks[3].projectPhaseID = this.projectPhaseFourID;
                            this.projectTasks[3].projectTasksID = 7;
                            this.projectTasks[3].projectTasksName = 'Meet with CSC';
                            this.projectTasks[3].projectTasksDescription = 'Meet with CSC';
                            this.projectTasks[3].projectTasksStatus = 'Active';
                            this.projectTasks[3].projectTasksStartDate = this.projectPhaseFourStartDate;
                            this.projectTasks[3].projectTasksEndDate = this.projectPhaseFourEndDate;
                            this.projectService.createTasks(this.projectPhaseProjectID4, this.projectTasks[3]).subscribe({
                                next : (result) => {
                                    console.log('TASK 6 : ' + result.projectPhaseID);              
                                },
                                error : (error) => {
                                    console.log(error);
                                }
                            });
                        this.projectService.createTasks(this.projectPhaseProjectID4, this.projectTasks[3]).subscribe({
                            next : (result) => {
                                console.log('TASK 7 : ' + result.projectPhaseID);              
                            },
                            error : (error) => {
                                console.log(error);
                            }
                        });
                    },
                    error: (error) => {
                        console.log('Phase 4 creation failed' + error);
                        console.log(error);
                    }
                });
                // PHASE FIVE CREATION
                this.projectService.createPhases(this.projectPhaseProjectID5, this.cPhases[4]).subscribe({
                    next: (result5) => {
                        console.log("Phase 5 has been created");
                        console.log(result5);
                        this.projectPhaseFiveID = result5.projectPhaseID;
                        console.log("projectPhaseFiveID: " + this.projectPhaseFiveID);  
                            this.projectTasks[4].projectID = this.projectPhaseProjectID5;
                            console.log("Tasks Project ID 5  : " + this.projectPhaseProjectID5);
                            this.projectTasks[4].projectPhaseID = this.projectPhaseFiveID;
                            this.projectTasks[4].projectTasksID = 8;
                            this.projectTasks[4].projectTasksName = 'Move Cutover Data';
                            this.projectTasks[4].projectTasksDescription = 'Move Cutover Data';
                            this.projectTasks[4].projectTasksStatus = 'Active';
                            this.projectTasks[4].projectTasksStartDate = this.projectPhaseFiveStartDate;
                            this.projectTasks[4].projectTasksEndDate = this.projectPhaseFiveEndDate;
                    
                            this.projectTasks[4].projectID = this.projectPhaseProjectID5;
                            console.log("Tasks Project ID 5  : " + this.projectPhaseProjectID5);
                            this.projectTasks[4].projectPhaseID = this.projectPhaseFiveID;
                            this.projectTasks[4].projectTasksID = 8;
                            this.projectTasks[4].projectTasksName = 'Complete Cutover Tasks';
                            this.projectTasks[4].projectTasksDescription = 'Complete Cutover Tasks';
                            this.projectTasks[4].projectTasksStatus = 'Active';
                            this.projectTasks[4].projectTasksStartDate = this.projectPhaseFiveStartDate;
                            this.projectTasks[4].projectTasksEndDate = this.projectPhaseFiveEndDate;  
                            this.projectService.createTasks(this.projectPhaseProjectID5, this.projectTasks[4]).subscribe({
                                next : (result) => {
                                    console.log('TASK 8 : ' + result.projectPhaseID);              
                                },
                                error : (error) => {
                                    console.log(error);
                                }
                            });
                    },
                    error: (error) => {
                        console.log('Phase 5 creation failed' + error);
                        console.log(error);
                    }          
                });
                // PHASE SIX CREATION
                this.projectService.createPhases(this.projectPhaseProjectID6, this.cPhases[5]).subscribe({
                    next: (result6) => {
                        console.log("Phase 6 has been created");
                        console.log(result6);
                        this.projectPhaseSixID = result6.projectPhaseID;
                        console.log("projectPhaseSixID: " + this.projectPhaseSixID);  
                            this.projectTasks[5].projectID = this.projectPhaseProjectID6;
                            console.log("Tasks Project ID 6  : " + this.projectPhaseProjectID6);
                            this.projectTasks[5].projectPhaseID = this.projectPhaseSixID;
                            this.projectTasks[5].projectTasksID = 9;
                            this.projectTasks[5].projectTasksName = 'Cutover Completed';
                            this.projectTasks[5].projectTasksDescription = 'Cutover Completed';
                            this.projectTasks[5].projectTasksStatus = 'Active';
                            this.projectTasks[5].projectTasksStartDate = this.projectPhaseSixStartDate;
                            this.projectTasks[5].projectTasksEndDate = this.projectPhaseSixEndDate;
                    
                            this.projectTasks[5].projectID = this.projectPhaseProjectID6;
                            console.log("Tasks Project ID 6  : " + this.projectPhaseProjectID6);
                            this.projectTasks[5].projectPhaseID = this.projectPhaseSixID;
                            this.projectTasks[5].projectTasksID = 9;
                            this.projectTasks[5].projectTasksName = 'Cutover Data Cleaned Up';
                            this.projectTasks[5].projectTasksDescription = 'Cutover Data Cleaned Up';
                            this.projectTasks[5].projectTasksStatus = 'Active';
                            this.projectTasks[5].projectTasksStartDate = this.projectPhaseSixStartDate;
                            this.projectTasks[5].projectTasksEndDate = this.projectPhaseSixEndDate;  
                            this.projectService.createTasks(this.projectPhaseProjectID6, this.projectTasks[5]).subscribe({
                                next : (result) => {
                                    console.log('TASK 9 : ' + result.projectPhaseID);
                                    this.router.navigate(['/project/' + this.projectPhaseProjectID]);              
                                },
                                error : (error) => {
                                    console.log(error);
                                }
                            });
                    },
                    error: (error) => {
                        console.log('Phase 6 creation failed' + error);
                        console.log(error);
                    }           
                }); 

        },
            error: (error) => {
                console.log(error);
            }
            });
        }

}
