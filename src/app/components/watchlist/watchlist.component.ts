import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  error = null;
  watchlist: any[] | undefined;
  noimage: string = '/assets/img/noimage.png'
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (!this.isSessionIdExisting()) {
      this.router.navigateByUrl("/login")
    } else {
      this.api.getWL().subscribe({
        next: (data) => (console.log(data), this.watchlist = data.results),
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
