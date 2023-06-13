import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableCategory, TableItem } from 'ui-kit-lib';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  categories: TableCategory[] = [
    { key: 'fullname', name: 'ФИ' },
    { key: 'email', name: 'Почта' },
    { key: 'phone', name: 'Телефон' },
  ];
  items: TableItem[] | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('clients').subscribe((response) => {
      (response as TableItem[]).map((item) => {
        item['fullname'] = `${item['name'] || ''} ${item['lastName'] || ''}`;
      });
      this.items = response as TableItem[];
    });
  }
}
