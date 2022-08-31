import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;
  logged: boolean = false;

  @Output() searchEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
    this.searchForm = this.formBuilder.group({
      searchKey: '',
    });
  }

  ngOnInit(): void {
    this.onChange();
    this.logged = this.api.getSessionId() != null ? true : false;
  }

  onChange(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      this.searchEvent.emit(value.searchKey);
    });
  }

  onSearch(form: FormGroup) {
    this.onChange();
  }

  logout() {
    this.api.logout(this.api.getSessionId() as string).subscribe({
      complete: () => (
        this.api.clearSessionStorage(),
        this.router.navigateByUrl("/home"),
        window.location.reload()
      ),
    });
  }
}
