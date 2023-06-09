import { Injectable } from '@angular/core';
import db from './mock.json';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getMock(url: string): unknown {
    if (url in URLS && URLS[url] in db) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return db[URLS[url]];
    }
    return {};
  }
}

const URLS: { [key: string]: string } = {
  products: 'products',
  brands: 'brands',
  categories: 'categories',
  subcategories: 'subcategories',
};
