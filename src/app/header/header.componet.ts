import { Component } from "@angular/core";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
templateUrl: './header.component.html',
   selector: 'app-header',
   standalone: true,
   imports: [ MatButtonModule, MatMenuModule, MatIconModule ],
   styleUrls: ['../app.component.css'],
})

export class HeaderComponent {

}