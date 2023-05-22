import { Component } from '@angular/core';
import {
  faFolder,
  faLemon,
  faMap,
  faMoneyBill1,
  faObjectUngroup,
  faRectangleList,
  faSquareCheck,
  faStar,
  faUser,
  faWindowMaximize,
} from '@fortawesome/free-regular-svg-icons';
import { Link } from 'ui-kit-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  paths: Link[] = [
    {
      name: 'Продукты',
      path: 'products',
      icon: faLemon,
    },
    {
      name: 'Пользователи',
      path: 'users',
      icon: faUser,
    },
    {
      name: 'Категории',
      path: 'categories',
      icon: faFolder,
    },
    {
      name: 'Города',
      path: 'cities',
      icon: faMap,
    },
    {
      name: 'Бренды',
      path: 'brands',
      icon: faStar,
    },
    {
      name: 'Протоколы',
      path: 'protocols',
      icon: faObjectUngroup,
    },
    {
      name: 'Заказы',
      path: 'orders',
      icon: faSquareCheck,
    },
    {
      name: 'Баннеры',
      path: 'banners',
      icon: faWindowMaximize,
    },
    {
      name: 'Семинары',
      path: 'seminars',
      icon: faRectangleList,
    },
    {
      name: 'Промокоды',
      path: 'promocodes',
      icon: faMoneyBill1,
    },
  ];
}