import { ModalService } from 'ui-kit-lib';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewContainerRef,
} from '@angular/core';
import { TableCategory, TableItem } from 'ui-kit-lib';
import { ProductPropertiesComponent } from './product-properties/product-properties.component';
import { FormGroup } from '@angular/forms';
import { Brand, Category, Product, SubCategory } from '../../types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  categories: TableCategory[] = MOCK.categories;
  items: TableItem[] = MOCK.items;
  form: FormGroup | null = null;

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  private updateItemFromModal(item: TableItem, newState: TableItem) {
    console.log(newState);

    if ('id' in newState) {
      item['id'] = newState['id'];
    }
    if ('nameFrom1C' in newState) {
      item['nameFrom1C'] = newState['nameFrom1C'];
    }
    if ('name' in newState) {
      item['name'] = newState['name'];
    }
    if ('codeFrom1C' in newState) {
      item['codeFrom1C'] = newState['codeFrom1C'];
    }
    if ('brand' in newState) {
      (item['brand'] as Brand).name = (
        newState['brand'] as { value: string }
      ).value;
    }
    if ('description' in newState) {
      item['description'] = newState['description'];
    }
    if ('images' in newState) {
      item['images'] = (newState['images'] as { images: string[] }).images;
    }
    if ('price' in newState) {
      item['price'] = newState['price'];
    }
    if ('sub_catalog_product' in newState) {
      (item['sub_catalog_product'] as SubCategory).name = (
        newState['sub_catalog_product'] as { value: string }
      ).value;
    }
    if ('catalog_product' in newState) {
      (item['catalog_product'] as Category).name = (
        newState['catalog_product'] as { value: string }
      ).value;
    }
    if ('tags' in newState) {
      item['tags'] = (newState['tags'] as { tags: string[] }).tags.map(
        (tag) => ({
          name: tag,
        })
      );
    }
    if ('characteristics' in newState) {
      item['characteristics'] = (
        newState['characteristics'] as {
          value: {
            [key: string]: string;
          }[];
        }
      ).value.map((c) => ({ key: c['name'], value: c['value'] }));
    }

    console.log(item);
    this.changeDetectionRef.detectChanges();
  }

  itemClick(item: TableItem) {
    const instance = this.modalService.open<ProductPropertiesComponent>(
      this.viewContainerRef,
      ProductPropertiesComponent,
      {
        inputs: {
          item: item,
          brands: BRANDS.map((brand) => brand.name),
          categories: CATEGORIES.map((category) => category.name),
          subCategories: SUB_CATEGORIES.map((subCategory) => subCategory.name),
        },
        outputs: {
          formChange: (form: FormGroup) => {
            this.form = form;
          },
        },
        applyButton: 'Сохранить и закрыть',
        cancelButton: 'Сохранить',
      }
    );

    instance.event.cancel.subscribe(() => console.log(this.form?.value));
    instance.event.apply.subscribe(() => {
      this.form && this.updateItemFromModal(item, this.form.value);
      instance.close();
    });
  }
}

const SUB_CATEGORIES = [
  {
    id: 'bb6ac2a4-6844-4001-95d8-4d2ea452675b',
    name: 'Линейные мезонити',
    position: 0,
    catalog_product: '644a5dd11b666a27fd169ee0',
    __v: 0,
  },
  {
    id: '9107f46c-5d18-4824-ab46-989775a908c7',
    name: 'Косметологические аппараты',
    position: 0,
    catalog_product: '644a5dd91b666a27fd169ee2',
    __v: 0,
  },
  {
    id: '98ac45eb-0ddc-439e-b649-5a1ff13e6daf',
    name: 'Очищение',
    position: 0,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '7c0320d2-4d2e-4631-aeaf-a359549a94d1',
    name: 'Обезболивающие средства',
    position: 0,
    catalog_product: '644a5de11b666a27fd169ee4',
    __v: 0,
  },
  {
    id: '06d815d6-2a82-4843-b53c-613b511764b4',
    name: 'Сыворотки',
    position: 0,
    catalog_product: '644a5e021b666a27fd169eec',
    __v: 0,
  },
  {
    id: 'f33be44e-fcab-48f2-9871-dc3b01e6873f',
    name: 'Филлеры',
    position: 0,
    catalog_product: '644a5d861b666a27fd169ed4',
    __v: 0,
  },
  {
    id: '72d4d04c-8b85-4bce-8252-949a22501fa8',
    name: 'Прямые',
    position: 0,
    catalog_product: '644a5db01b666a27fd169eda',
    __v: 0,
  },
  {
    id: 'ca488bad-c03a-40ed-b3c5-d1923b17932e',
    name: 'Зубная паста',
    position: 0,
    catalog_product: '644a5df91b666a27fd169eea',
    __v: 0,
  },
  {
    id: 'e5e3ef83-5e17-4e91-9ff7-be7496bbb4c3',
    name: 'Детокс',
    position: 0,
    catalog_product: '644a5df21b666a27fd169ee8',
    __v: 0,
  },
  {
    id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
    name: 'Биоревитализанты',
    position: 0,
    catalog_product: '644a5da71b666a27fd169ed8',
    __v: 0,
  },
  {
    id: '886cbec9-32be-43c1-8d52-7d316eb938c4',
    name: 'Кислотные пилинги',
    position: 0,
    catalog_product: '644a5dc71b666a27fd169ede',
    __v: 0,
  },
  {
    id: '695199be-25e8-42e8-a7a3-fd1e7fb92d64',
    name: 'Монопрепараты',
    position: 0,
    catalog_product: '644a5dbd1b666a27fd169edc',
    __v: 0,
  },
  {
    id: '794ecc03-2fc9-4cb0-8535-12d6d994983d',
    name: 'Обертывания и маски',
    position: 0,
    catalog_product: '644a5deb1b666a27fd169ee6',
    __v: 0,
  },
  {
    id: 'd43be51d-b4f5-4003-8ca9-f3b294b60d9d',
    name: 'Пептидные комплексы',
    position: 1,
    catalog_product: '644a5df21b666a27fd169ee8',
    __v: 0,
  },
  {
    id: '6d9720af-548a-4451-b5d2-6c7af839214d',
    name: 'Усиленные нити на спицах',
    position: 1,
    catalog_product: '644a5dd11b666a27fd169ee0',
    __v: 0,
  },
  {
    id: '5b5304fa-2d96-49ec-b8bc-3c7279792efc',
    name: 'Коктейли',
    position: 1,
    catalog_product: '644a5dbd1b666a27fd169edc',
    __v: 0,
  },
  {
    id: '0ce29f53-83f9-4761-a1dc-5120d6abb091',
    name: 'Непрямые',
    position: 1,
    catalog_product: '644a5db01b666a27fd169eda',
    __v: 0,
  },
  {
    id: '6a98af2a-e190-4af2-a8c9-7514f5cd4c72',
    name: 'Скрабы',
    position: 1,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: 'cbba1912-0c75-467a-9ff9-0e62ea0643ff',
    name: 'Бальзамы для полости рта',
    position: 1,
    catalog_product: '644a5df91b666a27fd169eea',
    __v: 0,
  },
  {
    id: '68f0fb01-cb71-48ec-a834-824795244807',
    name: 'Антисептики',
    position: 1,
    catalog_product: '644a5de11b666a27fd169ee4',
    __v: 0,
  },
  {
    id: 'f263b0a2-06fd-4ddd-ad8c-5d995290d0e5',
    name: 'Срединные пилинги',
    position: 1,
    catalog_product: '644a5dc71b666a27fd169ede',
    __v: 0,
  },
  {
    id: '241d1013-9356-4116-a3bd-e638824dcfa1',
    name: 'Контактные гели и аппаратные средства',
    position: 1,
    catalog_product: '644a5dd91b666a27fd169ee2',
    __v: 0,
  },
  {
    id: '3d9d091e-8eeb-4d0a-8b23-94bfdf2f170c',
    name: 'Иглы',
    position: 2,
    catalog_product: '644a5dd11b666a27fd169ee0',
    __v: 0,
  },
  {
    id: '1340eef8-7003-4c2e-ae28-1a476f56165b',
    name: 'Планета-М',
    position: 2,
    catalog_product: '644a5df21b666a27fd169ee8',
    __v: 0,
  },
  {
    id: 'd767ef1f-e93a-42e7-ae39-ee0aebdd36af',
    name: 'Массажные средства',
    position: 2,
    catalog_product: '644a5deb1b666a27fd169ee6',
    __v: 0,
  },
  {
    id: 'e71f03f8-7aef-4910-a0b6-efbe51ab5aa7',
    name: 'Тонизация',
    position: 2,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '631eb6c2-8f34-4d1b-9c32-8aef0372ecbe',
    name: 'Крем-пилинги',
    position: 2,
    catalog_product: '644a5dc71b666a27fd169ede',
    __v: 0,
  },
  {
    id: '3cfca427-e85e-490e-87ec-a263d722edad',
    name: 'SOS-средства',
    position: 2,
    catalog_product: '644a5de11b666a27fd169ee4',
    __v: 0,
  },
  {
    id: '9a5d6eb2-751e-4608-83d9-1feef90ea592',
    name: 'Кремы и сыворотки',
    position: 2,
    catalog_product: '644a5deb1b666a27fd169ee6',
    __v: 0,
  },
  {
    id: '0bde44b8-de67-47a4-8173-5d861310eaea',
    name: 'Ампульные концентраты',
    position: 3,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '4488b2cb-c307-474a-8f5b-02bbbe088b12',
    name: 'Наборы пилингов',
    position: 3,
    catalog_product: '644a5dc71b666a27fd169ede',
    __v: 0,
  },
  {
    id: '48f0b743-7d02-4054-a242-f430dc5c3caf',
    name: 'Средства для душа',
    position: 3,
    catalog_product: '644a5deb1b666a27fd169ee6',
    __v: 0,
  },
  {
    id: '127f808b-8177-4bd4-ae19-9de28db0d958',
    name: 'Канюли',
    position: 3,
    catalog_product: '644a5dd11b666a27fd169ee0',
    __v: 0,
  },
  {
    id: '3e9cd183-096f-4668-8327-c337f24d2ee5',
    name: 'Дезодораты',
    position: 4,
    catalog_product: '644a5deb1b666a27fd169ee6',
    __v: 0,
  },
  {
    id: '4ee8b3fa-8d48-4f01-bbe2-a20f021a77e4',
    name: 'Пред и постпилинговый уход',
    position: 4,
    catalog_product: '644a5dc71b666a27fd169ede',
    __v: 0,
  },
  {
    id: '0e325ef5-b8fd-483d-b136-78895788e5a0',
    name: 'Сыворотки-концентраты',
    position: 4,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '1e684538-f6c4-4812-9648-d8839d5b1521',
    name: 'Кремы и гели',
    position: 6,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: 'dfc36eda-47b3-441d-aa2e-7aef0106469e',
    name: 'Кремовые и гелевые маски',
    position: 7,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: 'b888c54e-7f17-4a0a-824b-8fd66fe56216',
    name: 'Тканевые маски',
    position: 8,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: 'b225ba13-a8b5-4d0c-a61f-1e963983ee11',
    name: 'Альгинатные и порошковые маски',
    position: 9,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '6145c65b-a5b3-4817-9f60-d5880d11b0db',
    name: 'Средства для ухода за областью глаз',
    position: 10,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '7f8cb495-a510-4356-bd28-f87412f5fd8e',
    name: 'Средства для ухода за губами',
    position: 11,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '463813f7-9ec8-4bde-8f0d-7d32c109fff0',
    name: 'Средства для ресниц и бровей',
    position: 12,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: 'bfaac240-b042-4157-a5dd-1beb12663fbb',
    name: 'Солнцезащитные средства',
    position: 13,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '75ce7d35-ecc4-4fc3-a159-6aee213cb0d1',
    name: 'Средства после загара',
    position: 14,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '8b263f2e-4470-4edf-ac08-b01e397f4250',
    name: 'Средства для автозагара',
    position: 15,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: '34827fe4-1370-458c-9bb1-cbb92b234876',
    name: 'Тональные средства',
    position: 16,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: 'ef4995ea-50c1-47c9-b4d2-fd3c42b6ce4e',
    name: 'Наборы',
    position: 17,
    catalog_product: '644a5d931b666a27fd169ed6',
    __v: 0,
  },
  {
    id: 'no-subcat-id',
    name: 'отсутсвует',
    position: 777,
    catalog_product: '644b9251bd8f4dc322a2670e',
    __v: 0,
  },
];

const CATEGORIES = [
  {
    id: '644a5d861b666a27fd169ed4',
    name: 'Контурная пластика',
    position: 0,
    __v: 0,
  },
  {
    id: '644a5d931b666a27fd169ed6',
    name: 'Эстетический уход',
    position: 1,
    __v: 0,
  },
  {
    id: '644a5da71b666a27fd169ed8',
    name: 'Биорепаранты/биоревитализанты',
    position: 2,
    __v: 0,
  },
  {
    id: '644a5db01b666a27fd169eda',
    name: 'Липолитики',
    position: 3,
    __v: 0,
  },
  {
    id: '644a5dbd1b666a27fd169edc',
    name: 'Мезопрепараты',
    position: 4,
    __v: 0,
  },
  {
    id: '644a5dc71b666a27fd169ede',
    name: 'Пилинги',
    position: 5,
    __v: 0,
  },
  {
    id: '644a5dd11b666a27fd169ee0',
    name: 'Нитевой лифтинг и расходные материалы',
    position: 6,
    __v: 0,
  },
  {
    id: '644a5dd91b666a27fd169ee2',
    name: 'Аппаратная косметология',
    position: 7,
    __v: 0,
  },
  {
    id: '644a5de11b666a27fd169ee4',
    name: 'Специальные средства',
    position: 8,
    __v: 0,
  },
  {
    id: '644a5deb1b666a27fd169ee6',
    name: 'Средства для коррекции фигуры и массажа и ухода за телом',
    position: 9,
    __v: 0,
  },
  {
    id: '644a5df21b666a27fd169ee8',
    name: 'Биологически активные добавки',
    position: 10,
    __v: 0,
  },
  {
    id: '644a5df91b666a27fd169eea',
    name: 'Уход за полостью рта',
    position: 11,
    __v: 0,
  },
  {
    id: '644a5e021b666a27fd169eec',
    name: 'Средства для волос',
    position: 12,
    __v: 0,
  },
  {
    id: '644b9251bd8f4dc322a2670e',
    name: 'отсутсвует',
    position: 777,
    __v: 0,
  },
];

const BRANDS = [
  {
    id: '4c5d671d-4b68-4a8a-aece-272f91c6d91f',
    name: 'Academie',
    icon: '27388458-d4c8-4d91-810c-df2c763cd4a9.jpg',
    margin: 100,
  },
  {
    id: '9c44f061-6a7a-40a9-9c5c-b5c512bb5048',
    name: 'V45',
    icon: 'c0f061fe-8e64-4620-835a-517ce44f1c5d.jpg',
    margin: 60,
  },
  {
    id: '7aaaeaee-6e50-4225-9ab2-15da6d802ba7',
    name: 'Laboratory Cytolife',
    icon: 'b350ff6b-5576-4c51-90a7-7747ec4b8c48.jpg',
    margin: 40,
  },
  {
    id: 'b5722983-b4a8-4e9a-b583-5211d5efe969',
    name: 'AGT M',
    icon: 'ebed07b3-d4b4-464a-b848-f2dc6ecc3112.jpg',
    margin: 0,
  },
  {
    id: '016eedd1-9a42-40d2-ad1c-c03ed8f36d1c',
    name: 'Лантановая косметика',
    icon: '50ff8f8c-acec-40a5-8786-e8ca3fed0abe.jpg',
    margin: 100,
  },
  {
    id: '92721955-31f4-4a27-8d08-9a94a7db179c',
    name: 'Florylis Pro',
    icon: '1b9dcbc5-36c4-4554-81ba-c88b7a8a36bf.jpg',
    margin: 100,
  },
  {
    id: 'f98f0cdf-4f88-43ad-afcf-ddd69cb44ff2',
    name: 'Kosmoteros Personnel Paris',
    icon: '5ddb4dd7-a8b7-4965-82f4-0fa17e1d38b8.jpg',
    margin: 100,
  },
  {
    id: '15418416-211e-44e6-86cc-0100709cb9d3',
    name: 'Kosmoteros Esthetique Paris',
    icon: 'b71959bf-ae18-4173-b409-725773a8da6b.jpg',
    margin: 0,
  },
  {
    id: 'bfc80e7e-76f3-4776-84ce-499647a1c359',
    name: 'bioGel',
    icon: '24729c9d-5233-4d4e-815b-8b9d7ed5b410.jpg',
    margin: 0,
  },
  {
    id: '17511963-3d9e-4e5b-a9ab-432ef78c6a18',
    name: 'Meso-relle',
    icon: 'e0e0cba8-26a0-48d1-8f75-3625827ed310.jpg',
    margin: 0,
  },
  {
    id: 'ba562be8-bfa6-4411-b866-cac1432290f3',
    name: 'Kosmoteros Professionnel Paris',
    icon: 'e39c13f8-7691-4669-b805-b311cfd5cc90.jpg',
    margin: 0,
  },
  {
    id: 'edf8b156-3c4b-48f6-a798-fc6cff6a3342',
    name: 'R-Studio',
    icon: 'da6ca6f4-d73b-4504-9379-e9cf7f44bf18.png',
    margin: 100,
  },
  {
    id: 'f0bc591f-2fd9-4a1c-af51-4213cbcbe395',
    name: 'QT Fill N',
    icon: '53de3e47-7139-451d-9754-d0ecaf7db2c4.jpg',
    margin: 0,
  },
  {
    id: 'b9a8c4ab-3570-47a4-a75f-940f784211bd',
    name: 'Vec',
    icon: 'bbee97dc-a64d-43e5-8929-b709d5583747.jpg',
    margin: 60,
  },
  {
    id: '8d39b633-dfe2-4e4f-9d9e-cdac0978db60',
    name: 'Miraline',
    icon: 'ff9143c8-c32e-4341-9efc-fefcd0349ad1.jpg',
    margin: 0,
  },
  {
    id: 'f338b0d7-74e4-4034-b5d2-55df2169240d',
    name: 'Эвгулон',
    icon: '2592777c-93d0-4d30-9ecb-7d68562a54e8.jpg',
    margin: 0,
  },
  {
    id: '64b0dd37-3fb6-4958-947d-6da58bb93c9b',
    name: 'Vivax',
    icon: '13f1d778-1dc9-479c-b359-8db566264d93.jpg',
    margin: 60,
  },
  {
    id: 'a3a8059a-8b8d-49d6-ac62-0f4cd95712e9',
    name: 'Vitual',
    icon: 'd20826b8-dd4d-4717-b1d9-6460d43864af.jpg',
    margin: 0,
  },
  {
    id: '9c55d8fc-144b-4803-beee-0cf42ee7ff84',
    name: 'Sungshim',
    icon: '4ac9af03-be2e-4ce5-8319-9e4edaceda40.jpg',
    margin: 0,
  },
  {
    id: '01f9f7f4-94a8-4376-87ba-6fbfd126f518',
    name: 'Onyx lift',
    icon: '1f3ef64c-162a-47ab-b317-5eba55d8a33d.jpg',
    margin: 0,
  },
  {
    id: '1ae1ea4a-7ef3-42c0-96e4-ae4938bdb946',
    name: 'yu.r',
    icon: '0bc8e039-a729-418d-adbe-38887540b848.jpg',
    margin: 53,
  },
  {
    id: '94933aa6-79c4-4b35-adcd-e9621e750d59',
    name: 'Ингибитор H.Q.B.M.',
    icon: 'd54fdcef-5b4a-4dc5-8325-b118e057adcb.jpg',
    margin: 100,
  },
  {
    id: 'e59e011b-e8af-4812-b8c6-d2cd19f3f462',
    name: 'Perfotesoro',
    icon: '847e3b60-9683-485b-aa7e-1379dec020d0.jpg',
    margin: 50,
  },
  {
    id: '04f55f73-46c2-4b0a-9004-b329cea2addb',
    name: 'Time Machine',
    icon: '747ff04f-920c-44b8-a08d-607d2e678a8c.png',
    margin: 0,
  },
  {
    id: '01100ccf-6f94-4864-9e63-59ab08b740b4',
    name: 'Kosmoteros Forte Paris',
    icon: '5430cc32-bc24-4006-86d3-05682ab54ba5.jpg',
    margin: 0,
  },
  {
    id: 'ebecd82a-4b35-4026-8258-ef70a8bb07f6',
    name: 'BioSLine',
    icon: '3e044030-86e1-44b0-9f75-d1ce82aa1edb.jpg',
    margin: 0,
  },
  {
    id: 'fd5421fe-f479-4b08-abf1-5ac2d4c07d6d',
    name: 'Egia',
    icon: '8e8a7917-5fa8-402d-8b92-53cf05211d83.jpg',
    margin: 80,
  },
  {
    id: '1685022786057',
    name: 'wtf',
    icon: '',
  },
];

const MOCK: {
  categories: TableCategory[];
  items: Product[];
} = {
  categories: [
    { key: 'name', name: 'Название' },
    { key: 'codeFrom1C', name: 'Артикул' },
  ],
  items: [
    {
      id: '6ee9ef45-57b1-4112-a3af-5ac3f241b8e3',
      nameFrom1C: 'Anti-age концентрат "Сыворотка "Супер Соя", 50 мл',
      name: 'Cytolife Маска питательная с маслом авокадо, 30 г',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '7aaaeaee-6e50-4225-9ab2-15da6d802ba7',
        name: 'Laboratory Cytolife',
        icon: 'b350ff6b-5576-4c51-90a7-7747ec4b8c48.jpg',
        margin: 40,
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: '6a98af2a-e190-4af2-a8c9-7514f5cd4c72',
        name: 'Скрабы',
        position: 1,
        catalog_product: '644a5d931b666a27fd169ed6',
        __v: 0,
      },
      catalog_product: {
        id: '644a5d931b666a27fd169ed6',
        name: 'Эстетический уход',
        position: 1,
        __v: 0,
      },
      variations: [
        {
          id: 1683721381012,
          value: '',
          code: '',
        },
      ],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-4532-a3af-5ac3f241b8e4',
      nameFrom1C: 'Anti-age концентрат "Сыворотка "Супер Соя", 50 мл',
      name: 'Cytolife Маска омолаживающая с экстрактом черной икры, 350 г',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [
        {
          id: 1683721561783,
          value: '',
          code: '',
        },
      ],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-4332-a3af-5ac3f24sb8e5',
      nameFrom1C: 'Anti-age концентрат "Сыворотка "Супер Соя" 50 мл',
      name: 'Anti-age концентрат "Сыворотка "Супер Соя", 50 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-5272-a3af-5ac3f241b8e5',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO Ухудшение и усугубление, 25 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=0f7fe3e9-98fb-478c-a84d-0883ed245a7d',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [
        {
          id: 1683899516167,
          value: '',
          code: '',
        },
      ],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-4386-a3af-5ac3f241z8e1',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO SUPER POWER, 5 л',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-2975-a3af-5ac3f241b8e1',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO RECOVERY, 15 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-4372-a3af-5ac3f331b8e1',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO CARE, 5 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-1272-a3af-5ac3f245b8e1',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO Восстановление и обновление, 5 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-4572-a3af-5ac3f241b8e1',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO Восстановление и обновление, 5 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-4322-a3af-5ac3f241b8e1',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO Восстановление и обновление, 5 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6eesef45-57b1-4309-a3af-5ac3f241b8e1',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO Восстановление и обновление, 5 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
    {
      id: '6ee9ef45-57b1-4992-a3af-3ac3f241b8e1',
      nameFrom1C: 'AGT BIO Восстановление и обновление 5мл',
      name: 'AGT BIO Восстановление и обновление, 5 мл',
      codeFrom1C: 'УТ000001350',
      brand: {
        id: '129b7d00-4a7a-45ed-8eda-d96cbcb52770',
        name: 'AGT Bio',
        icon: '0f7fe3e9-98fb-478c-a84d-0883ed245a7d.jpg',
      },
      description:
        'Препарат предназначен для молодой кожи в целях профилактики старения, устранения сухости, увлажнения кожи вокруг глаз, для уменьшения «гусиных лапок», синевы под глазами, повышения иммунного статуса кожи, снятия отечности и пастозности лица, антиоксидантная защита, восстановление кожи после избыточной инсоляции, подготовка и реабилитация после лазерных процедур.\n\nПоказания к применению: Морщины периорбитальной и периоральной зоны, молодая, тонкая и обезвоженная кожа, сниженный тургор, кожа склонная к пастозности, мелкоморщинистый тип старения, ТАЭ, купероз, чувствительная кожа, нарушенный эпидермальный барьер.\n\nСостав: гиалуронат натрия 0,8% (1100-1300 кДа), трегалоза, маннитол, буферный раствор.\n\nСтерильно, апирогенно, нетоксично.',
      images: [
        'https://drive.google.com/uc?export=view&id=1OZcJHRACGwkj4-rE0ZfIoi9ngKUj75_y',
        'https://drive.google.com/uc?export=view&id=16d-yUL2pEo2FLPyTwRHQEPQ6JQYugwnp',
      ],
      price: 2000,
      sub_catalog_product: {
        id: 'fcfec920-558b-47ac-81a2-f11d4e7c54a1',
        name: 'Биоревитализанты',
        position: 0,
      },
      catalog_product: {
        id: '644a5da71b666a27fd169ed8',
        name: 'Биорепаранты/биоревитализанты',
        position: 2,
      },
      variations: [],
      characteristics: [
        {
          id: '9033b2fd-a2f4-4ade-9e5e-61e01af7e832',
          key: 'Код товара',
          value: '',
        },
        {
          id: '55c30ef0-05c1-48e3-9d55-d31d01f240fd',
          key: 'Тип кожи',
          value: 'обезвоженная кожа, чувствительная кожа, куперозная кожа',
        },
        {
          id: 'c7a605c9-0a23-466a-8dad-27a1b29d3a66',
          key: 'Возрасты',
          value: '20+, 30+, 40+, 50+, 60+',
        },
        {
          id: 'e0791b37-29b2-4043-b3a3-b8fc4421c237',
          key: 'Страна-производитель',
          value: 'Россия (Сколково)',
        },
      ],
      tags: [
        {
          id: '45188a94-48cb-4967-8cc6-fe947f6d41c2',
          name: 'Восстановление и обновление',
        },
        {
          id: '0dd83b18-7ded-4a5e-9636-84ef0ce54a38',
          name: 'AGT',
        },
        {
          id: '4595df03-d07d-46aa-946e-003b6eb05f5d',
          name: 'AGT BIO',
        },
      ],
    },
  ],
};
