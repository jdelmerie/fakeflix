import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.searchForm = this.formBuilder.group({
      searchKey: '',
    });
  }

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void {
    this.searchForm.valueChanges.subscribe((value) => {
      this.searchEvent.emit(value.searchKey);
    });
  }

  onSearch(form: FormGroup) {
    this.onChange();
  }
}
