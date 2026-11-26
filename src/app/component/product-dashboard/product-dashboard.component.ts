import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UuidService } from 'src/app/services/uuid.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Iproduct } from 'src/app/modules/product.module';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {

  products : Array<Iproduct> = [
  {
    prodId: '1',
    productName: 'Laptop',
    brand: 'Dell',
    category: 'Electronics',
    price: 55000,
    discount: 10,
    quantity: 15,
    color: 'Black',
    rating: 4.5,
    isAvailable: true,
    description: 'High performance laptop for developers',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
  },
  {
    prodId: '2',
    productName: 'Smartphone',
    brand: 'Samsung',
    category: 'Electronics',
    price: 25000,
    discount: 15,
    quantity: 25,
    color: 'Blue',
    rating: 4.3,
    isAvailable: true,
    description: 'Latest smartphone with advanced camera',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
  },
  {
    prodId: '3',
    productName: 'Smart Watch',
    brand: 'Apple',
    category: 'Accessories',
    price: 35000,
    discount: 5,
    quantity: 10,
    color: 'Silver',
    rating: 4.7,
    isAvailable: true,
    description: 'Smart watch with fitness tracking',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  {
    prodId: '4',
    productName: 'Headphones',
    brand: 'Sony',
    category: 'Electronics',
    price: 5000,
    discount: 20,
    quantity: 30,
    color: 'Black',
    rating: 4.4,
    isAvailable: true,
    description: 'Wireless headphones with noise cancellation',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  // {
  //   prodId: 5,
  //   productName: 'Keyboard',
  //   brand: 'Logitech',
  //   category: 'Computer Accessories',
  //   price: 2500,
  //   discount: 10,
  //   quantity: 40,
  //   color: 'White',
  //   rating: 4.2,
  //   isAvailable: true,
  //   description: 'Wireless keyboard for office and gaming',
  //   imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
  // },
  // {
  //   prodId: 6,
  //   productName: 'Mouse',
  //   brand: 'HP',
  //   category: 'Computer Accessories',
  //   price: 1200,
  //   discount: 5,
  //   quantity: 50,
  //   color: 'Grey',
  //   rating: 4.1,
  //   isAvailable: true,
  //   description: 'Ergonomic wireless computer mouse',
  //   imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
  // },
  // {
  //   prodId: 7,
  //   productName: 'Tablet',
  //   brand: 'Lenovo',
  //   category: 'Electronics',
  //   price: 18000,
  //   discount: 12,
  //   quantity: 18,
  //   color: 'Grey',
  //   rating: 4.3,
  //   isAvailable: true,
  //   description: 'Portable tablet for entertainment and work',
  //   imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
  // },
  // {
  //   prodId: 8,
  //   productName: 'Camera',
  //   brand: 'Canon',
  //   category: 'Photography',
  //   price: 45000,
  //   discount: 8,
  //   quantity: 8,
  //   color: 'Black',
  //   rating: 4.8,
  //   isAvailable: true,
  //   description: 'Professional digital camera for photography',
  //   imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
  // },
  // {
  //   prodId: 9,
  //   productName: 'Backpack',
  //   brand: 'Wildcraft',
  //   category: 'Fashion',
  //   price: 1800,
  //   discount: 15,
  //   quantity: 35,
  //   color: 'Blue',
  //   rating: 4.2,
  //   isAvailable: true,
  //   description: 'Durable backpack for travel and college',
  //   imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
  // },
  // {
  //   prodId: 10,
  //   productName: 'Running Shoes',
  //   brand: 'Nike',
  //   category: 'Footwear',
  //   price: 4500,
  //   discount: 20,
  //   quantity: 20,
  //   color: 'White',
  //   rating: 4.6,
  //   isAvailable: true,
  //   description: 'Comfortable running shoes for daily workouts',
  //   imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
  // },
];
  isInEditMode : boolean = false;
  editId !: string;

  // ViewChild References
  @ViewChild('productNameRef') productNameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('brandRef') brandRef!: ElementRef<HTMLInputElement>;
  @ViewChild('categoryRef') categoryRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('priceRef') priceRef!: ElementRef<HTMLInputElement>;
  @ViewChild('discountRef') discountRef!: ElementRef<HTMLInputElement>;
  @ViewChild('quantityRef') quantityRef!: ElementRef<HTMLInputElement>;
  @ViewChild('colorRef') colorRef!: ElementRef<HTMLInputElement>;
  @ViewChild('ratingRef') ratingRef!: ElementRef<HTMLInputElement>;
  @ViewChild('imageUrlRef') imageUrlRef!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionRef') descriptionRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('isAvailableRef') isAvailableRef!: ElementRef<HTMLSelectElement>;

  constructor(
    private _uuidService : UuidService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onProductAdd(){
    let newProduct: Iproduct = {
      productName: this.productNameRef.nativeElement.value,
      brand: this.brandRef.nativeElement.value,
      category: this.categoryRef.nativeElement.value,
      price: Number(this.priceRef.nativeElement.value),
      discount: Number(this.discountRef.nativeElement.value),
      quantity: Number(this.quantityRef.nativeElement.value),
      color: this.colorRef.nativeElement.value,
      rating: Number(this.ratingRef.nativeElement.value),
      isAvailable: this.isAvailableRef.nativeElement.value === 'yes' ? true : false,
      description: this.descriptionRef.nativeElement.value.trim(),
      imageUrl: this.imageUrlRef.nativeElement.value,
      prodId: this._uuidService.getUuid(),
   };
   console.log(newProduct)
    this.products.unshift(newProduct);

    this.productNameRef.nativeElement.value = ''
    this.brandRef.nativeElement.value = ''
    this.categoryRef.nativeElement.value = ''
    this.priceRef.nativeElement.value = ''
    this.discountRef.nativeElement.value = ''
    this.quantityRef.nativeElement.value = ''
    this.colorRef.nativeElement.value = ''
    this.ratingRef.nativeElement.value = ''
    this.isAvailableRef.nativeElement.value = ''
    this.descriptionRef.nativeElement.value = ''
    this.imageUrlRef.nativeElement.value = ''

    this._snackbar.openSnackbar(
      `The product with id ${newProduct. prodId} is added successfully !!!`
    );

  
  }

  onProductEdit(product : Iproduct){
    this.isInEditMode = true;
    this.editId = product.prodId;
    this.productNameRef.nativeElement.value = product.productName;
    this.brandRef.nativeElement.value = product.brand;
    this.categoryRef.nativeElement.value = product.category;
    this.priceRef.nativeElement.value = product.price.toString();
    this.discountRef.nativeElement.value = product.discount.toString();
    this.quantityRef.nativeElement.value = product.quantity.toString();
    this.colorRef.nativeElement.value = product.color
    this.ratingRef.nativeElement.value = product.rating.toString();
    this.isAvailableRef.nativeElement.value = product.isAvailable ? 'yes' : 'no';
    this.descriptionRef.nativeElement.value = product.description;
    this.imageUrlRef.nativeElement.value = product.imageUrl;
  }

  onProductUpdate(){
      let updatedProd : Iproduct = {
      productName: this.productNameRef.nativeElement.value,
      brand: this.brandRef.nativeElement.value,
      category: this.categoryRef.nativeElement.value,
      price: Number(this.priceRef.nativeElement.value),
      discount: Number(this.discountRef.nativeElement.value),
      quantity: Number(this.quantityRef.nativeElement.value),
      color: this.colorRef.nativeElement.value,
      rating: Number(this.ratingRef.nativeElement.value),
      isAvailable: this.isAvailableRef.nativeElement.value === 'yes' ? true : false,
      description: this.descriptionRef.nativeElement.value.trim(),
      imageUrl: this.imageUrlRef.nativeElement.value,
      prodId : this.editId
      }

      let getIndex = this.products.findIndex(p => p.prodId === this.editId);
      this.products[getIndex] = updatedProd;

      this.productNameRef.nativeElement.value = ''
      this.brandRef.nativeElement.value = ''
      this.categoryRef.nativeElement.value = ''
      this.priceRef.nativeElement.value = ''
      this.discountRef.nativeElement.value = ''
      this.quantityRef.nativeElement.value = ''
      this.colorRef.nativeElement.value = ''
      this.ratingRef.nativeElement.value = ''
      this.isAvailableRef.nativeElement.value = ''
      this.descriptionRef.nativeElement.value = ''
      this.imageUrlRef.nativeElement.value = ''

      this._snackbar.openSnackbar(
        `The product with id ${this.editId} is updated successfully !!!`
      );
      this.isInEditMode = false;
  }

  onProductDelete(prodId : string){
    let getConfirm = confirm(`Are you sure, you want to remove Product with id ${prodId} successfully !!`)
    if(getConfirm){
      let removeIndex = this.products.findIndex(s => s.prodId === prodId)
      this.products.splice(removeIndex, 1);
      this._snackbar.openSnackbar(`the product with id ${prodId} is removed succesfully !!!`)
    }
  }
  
  trackByProdId(index : number, product:Iproduct){
    return product.prodId
  }

}
