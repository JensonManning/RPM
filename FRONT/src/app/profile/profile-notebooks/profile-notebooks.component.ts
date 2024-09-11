import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-profile-notebooks',
  standalone: true,
  imports: [RouterLink, MatCardModule, CdkAccordionModule],
  templateUrl: './profile-notebooks.component.html',
  styleUrl: './profile-notebooks.component.scss'
})
export class ProfileNotebooksComponent {

      // Accordion
      items = ['Accordion Item 1', 'Accordion Item 2', 'Accordion Item 3', 'Accordion Item 4', 'Accordion Item 5'];
      expandedIndex = 0;
  
      // isToggled
      isToggled = false;
  
      constructor(
          public themeService: CustomizerSettingsService
      ) {
          this.themeService.isToggled$.subscribe(isToggled => {
              this.isToggled = isToggled;
          });
      }
  

}
