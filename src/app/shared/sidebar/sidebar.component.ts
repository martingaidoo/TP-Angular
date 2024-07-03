import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor() {}

  signOut() {
    // remove token from local storage to log user out
    localStorage.removeItem('token');
  }

  activarSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('translate-x-full');
      sidebar.classList.toggle('md:translate-x-0');
      sidebar.classList.toggle('sm:-translate-x-80');
      sidebar.classList.toggle('sm:translate-x-0');
      sidebar.classList.toggle('-translate-x-80');
    }
  }
}
