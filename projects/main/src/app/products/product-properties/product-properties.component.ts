import { HttpClient } from '@angular/common/http';
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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.formChange.emit(this.form);
    });

    this.http.get('brands').subscribe((response) => {
      this.brands = response as Brand[];
    });
    this.http.get('categories').subscribe((response) => {
      this.categories = response as Category[];
    });
    this.http.get('subcategories').subscribe((response) => {
      this.subCategories = response as SubCategory[];
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
      /*
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
      */
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
