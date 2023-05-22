import { Component, Type, ViewContainerRef } from '@angular/core';
import {
  Link,
  ModalInstance,
  TableCategory,
  TableItem,
  ModalService,
} from 'ui-kit-lib';
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
import { SampleComponent } from './sample/sample.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  modalRef: ModalInstance | null = null;

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  private openModal() {
    this.modalRef = this.modalService.open(
      this.viewContainerRef,
      SampleComponent as Type<Component>,
      {
        applyButton: 'Сохранить',
        cancelButton: 'Отмена',
      }
    );

    Object.entries(this.modalRef.event).forEach(([name, event]) => {
      event.subscribe(() => console.log(name));
    });
  }

  onItemClick(item: TableItem) {
    console.log(item);
  }

  modalToggle() {
    if (this.modalRef && this.modalRef.isValid) {
      this.modalRef.close();
    } else {
      this.openModal();
    }
  }

  links = LINKS;
  categories = CATEGORIES;
  items = ITEMS;
}

const LINKS: Link[] = [
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

const CATEGORIES: TableCategory[] = [
  {
    key: 'check',
    name: '?',
  },
  {
    key: 'subcategory',
    name: 'Подкатегория',
  },
  {
    key: 'brand',
    name: 'Бренд',
  },
  {
    key: 'category',
    name: 'Категория',
    position: 1,
  },
  {
    key: 'products',
    name: 'Товары',
  },
  {
    key: 'cashback',
    name: 'Кэшбэк',
    aligment: 'center',
  },
];

// 50 items
const ITEMS: TableItem[] = [
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Очищение',
    brand: '-',
    products: '-',
    cashback: '20%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Скрабы',
    brand: 'Academie',
    products: 'Гоммаж с кремом и витамином У, 50мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Тонизация',
    brand: 'Academie',
    products: 'Нормализующий лосьон, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Кремы и гели',
    brand: 'Academie',
    products: 'Восстанавливающий уход с кальцием, 50мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Очищение',
    brand: '-',
    products: '-',
    cashback: '20%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Скрабы',
    brand: 'Academie',
    products: 'Гоммаж с кремом и витамином У, 50мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Тонизация',
    brand: 'Academie',
    products: 'Нормализующий лосьон, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Кремы и гели',
    brand: 'Academie',
    products: 'Восстанавливающий уход с кальцием, 50мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Очищение',
    brand: '-',
    products: '-',
    cashback: '20%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Скрабы',
    brand: 'Academie',
    products: 'Гоммаж с кремом и витамином У, 50мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Тонизация',
    brand: 'Academie',
    products: 'Нормализующий лосьон, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Кремы и гели',
    brand: 'Academie',
    products: 'Восстанавливающий уход с кальцием, 50мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Очищение',
    brand: '-',
    products: '-',
    cashback: '20%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Скрабы',
    brand: 'Academie',
    products: 'Гоммаж с кремом и витамином У, 50мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Тонизация',
    brand: 'Academie',
    products: 'Нормализующий лосьон, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Кремы и гели',
    brand: 'Academie',
    products: 'Восстанавливающий уход с кальцием, 50мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Очищение',
    brand: '-',
    products: '-',
    cashback: '20%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Скрабы',
    brand: 'Academie',
    products: 'Гоммаж с кремом и витамином У, 50мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Тонизация',
    brand: 'Academie',
    products: 'Нормализующий лосьон, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Кремы и гели',
    brand: 'Academie',
    products: 'Восстанавливающий уход с кальцием, 50мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Очищение',
    brand: '-',
    products: '-',
    cashback: '20%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Скрабы',
    brand: 'Academie',
    products: 'Гоммаж с кремом и витамином У, 50мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Тонизация',
    brand: 'Academie',
    products: 'Нормализующий лосьон, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Кремы и гели',
    brand: 'Academie',
    products: 'Восстанавливающий уход с кальцием, 50мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Очищение',
    brand: '-',
    products: '-',
    cashback: '20%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Скрабы',
    brand: 'Academie',
    products: 'Гоммаж с кремом и витамином У, 50мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Тонизация',
    brand: 'Academie',
    products: 'Нормализующий лосьон, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Кремы и гели',
    brand: 'Academie',
    products: 'Восстанавливающий уход с кальцием, 50мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Очищение',
    brand: '-',
    products: '-',
    cashback: '20%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Скрабы',
    brand: 'Academie',
    products: 'Гоммаж с кремом и витамином У, 50мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Тонизация',
    brand: 'Academie',
    products: 'Нормализующий лосьон, 200мл',
    cashback: '10%',
  },
  {
    check: 'ok',
    category: 'Эстетический уход',
    subcategory: 'Кремы и гели',
    brand: 'Academie',
    products: 'Восстанавливающий уход с кальцием, 50мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Пилинги',
    subcategory: 'Кислотные пилинги',
    brand: 'Flolyis Pro',
    products: 'Ночной пилинг-концентрат “Soin peeling Nuit defruits”, 6мл',
    cashback: '15%',
  },
  {
    check: 'ok',
    category: 'Средства для коррекции фигуры и массажа ',
    subcategory: 'Средства для душа',
    brand: 'Kosmoteros Personnel Paris',
    products: 'Активный специальный гель для душа с маслом макадамии, 200мл',
    cashback: '10%',
  },
];
