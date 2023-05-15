import { Component } from '@angular/core';
import { Link } from 'ui-kit-lib';
import { faFolder, faLemon, faMap, faMoneyBill1, faObjectUngroup, faRectangleList, faSquareCheck, faStar, faUser, faWindowMaximize } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui-kit-test'

  links: Link[] = LINKS
}

const LINKS: Link[] = [
  {
    name: 'Продукты',
    path: 'products',
    icon: faLemon
  },
  {
    name: 'Пользователи',
    path: 'users',
    icon: faUser
  },
  {
    name: 'Категории',
    path: 'categories',
    icon: faFolder
  },
  {
    name: 'Города',
    path: 'cities',
    icon: faMap
  },
  {
    name: 'Бренды',
    path: 'brands',
    icon: faStar
  },
  {
    name: 'Протоколы',
    path: 'protocols',
    icon: faObjectUngroup
  },
  {
    name: 'Заказы',
    path: 'orders',
    icon: faSquareCheck
  },
  {
    name: 'Баннеры',
    path: 'banners',
    icon: faWindowMaximize
  },
  {
    name: 'Семинары',
    path: 'seminars',
    icon: faRectangleList
  },
  {
    name: 'Промокоды',
    path: 'promocodes',
    icon: faMoneyBill1
  },
]