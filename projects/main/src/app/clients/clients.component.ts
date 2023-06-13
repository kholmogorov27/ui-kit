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
  items: TableItem[] = [];
  filtered: TableItem[] = [];

  filter = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  private fetchClients() {
    this.http.get('clients').subscribe((response) => {
      (response as TableItem[]).map((item) => {
        item['fullname'] = `${item['name'] || ''} ${item['lastName'] || ''}`;
      });
      this.setItems(response as TableItem[]);
    });
  }

  setItems(value: TableItem[]) {
    this.items = value;
    this.filtered = this.items;
  }

  onSearchInput(value: string) {
    this.filter = value;
    const filtered = this.items.filter((item) =>
      (item['fullname'] as string).toLowerCase().includes(value)
    );
    if (filtered) {
      this.filtered = filtered;
    }
  }
}
