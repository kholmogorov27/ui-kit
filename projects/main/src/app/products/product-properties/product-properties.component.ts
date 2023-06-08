import { Brand, Category, Product, SubCategory } from './../../../types';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { requireImages, requireProps } from 'projects/main/src/validators';

@Component({
  selector: 'app-product-properties',
  templateUrl: './product-properties.component.html',
  styleUrls: ['./product-properties.component.scss'],
})
export class ProductPropertiesComponent implements OnInit, OnChanges {
  @Input() item: Product | null = null;
  @Input() categories: Category[] = [];
  @Input() subCategories: SubCategory[] = [];
  @Input() brands: Brand[] = [];

  @Output() formChange = new EventEmitter();

  form = this.buildForm();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.formChange.emit(this.form);
    });
  }

  ngOnChanges() {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      nameFrom1C: {
        value: this.item ? this.item.nameFrom1C : '',
        disabled: true,
      },
      name: [
        this.item ? this.item.name : '',
        { validators: [Validators.required], updateOn: 'blur' },
      ],
      brand: [
        {
          value: this.item ? this.item.brand.name : '',
          options: this.brands,
        },
        { validators: [Validators.required] },
      ],
      codeFrom1C: {
        value: this.item ? this.item.codeFrom1C : '',
        disabled: true,
      },
      description: [
        this.item ? this.item.description : '',
        { validators: [Validators.required], updateOn: 'blur' },
      ],
      images: [
        {
          images: this.item ? this.item.images : [],
          limit: 5,
          description: 'Размер фото 1000x1000 px PNG, JPG, JPEG',
        },
        { validators: [requireImages] },
      ],
      price: { value: this.item ? this.item.price : '', disabled: true },
      catalog_product: [
        {
          value: this.item ? this.item.catalog_product.name : '',
          options: this.categories,
        },
        { validators: [Validators.required] },
      ],
      sub_catalog_product: [
        {
          value: this.item ? this.item.sub_catalog_product.name : '',
          options: this.subCategories,
          disabled: true,
        },
        { validators: [Validators.required] },
      ],
      volume: [
        {
          value: [
            {
              value: this.item && this.item.volume ? this.item.volume : '',
              codeFrom1C: this.item ? this.item.codeFrom1C : '',
            },
            { value: '', codeFrom1C: '' },
          ],
          fields: [
            {
              key: 'value',
              placeholder: 'Значение',
            },
            {
              key: 'codeFrom1C',
              placeholder: 'Артикул',
            },
          ],
        },
        { validators: [requireProps] },
      ],
      characteristics: {
        fields: [
          {
            key: 'name',
            placeholder: 'Название характеристики',
          },
          {
            key: 'value',
            placeholder: 'Значение характеристики',
          },
        ],
        limit: 15,
        limitTextTemplate: (limit: number) => `Максимум ${limit} харакеристик`,
        value: this.item
          ? this.item.characteristics.map((c) => ({
              name: c.key,
              value: c.value,
            }))
          : '',
      },
      tags: {
        tags: this.item ? this.item.tags.map((tag) => tag.name) : [],
        limit: 120,
      },
    });
  }
}

const MOCK = {
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
  },
  catalog_product: {
    id: '644a5d931b666a27fd169ed6',
    name: 'Эстетический уход',
    position: 1,
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
  volume: '50ml',
};
