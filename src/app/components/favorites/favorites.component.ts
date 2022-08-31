import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  error = null;
  favs: any[] | undefined;
  noimage: string = '/assets/img/noimage.png'
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (!this.isSessionIdExisting()) {
      this.router.navigateByUrl("/login")
    } else {
      this.api.getFavs().subscribe({
        next: (data) => (console.log(data), this.favs = data.results),
        error: (err) => (this.error = err.message),
        complete: () => (this.error = null),
      });
    }
  }

  isSessionIdExisting(): boolean {
    return this.api.getSessionId() != null ? true : false;
  }

  goToMovie(id: number) {
    this.router.navigateByUrl('movie/' + id);
  }
}
