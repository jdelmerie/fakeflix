import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any;
  error = null;
  noimage: string = '/assets/img/noimage.png'
  title: string = '';
  page: number = 1;
  totalItems: number = 0;
  tableSize: number = 20;
  paginationOff: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.switch(data['link'])
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.route.data.subscribe(data => {
      this.switch(data['link'])
    });
  }

  private switch(link: any) {
    switch (link) {
      case 'home':
        this.getMovies();
        break;
      case 'favorites':
        this.getFavs();
        break;
      case 'watchlist':
        this.getWL();
        break;
    }
  }

  getMovies(value: string = "") {
    if (value) {
      this.page = 1;
      this.paginationOff = true;
      this.api.getMoviesBySearch(value).subscribe(data => {
        this.getDataAndTotalItems(data, "Search results")
      });
    } else {
      this.api.getUpComings(this.page).subscribe(data => {
        this.getDataAndTotalItems(data, "Upcomings")
      });
    }
  }

  private getFavs() {
    if (this.api.isSessionIdExisting()) {
      this.api.getFavs(this.page).subscribe(data => {
        this.getDataAndTotalItems(data, "Your favorites")
      });
    }
  }


  private getWL() {
    if (this.api.isSessionIdExisting()) {
      this.api.getWL(this.page).subscribe(data => {
        this.getDataAndTotalItems(data, "Your watchlist")
      }
      );
    }
  }

  private getDataAndTotalItems(data: any, title: string) {
    this.movies = data.results;
    this.title = title;
    this.totalItems = data.total_results;
  }

  goToMovie(id: number) {
    this.router.navigateByUrl('movie/' + id);
  }
}
