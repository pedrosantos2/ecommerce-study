import { Component} from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [
    
  ],
  templateUrl: './home.component.html',

  styleUrl: './home.component.css',

})
export class HomeComponent {
  isSidebarOpen = true;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
