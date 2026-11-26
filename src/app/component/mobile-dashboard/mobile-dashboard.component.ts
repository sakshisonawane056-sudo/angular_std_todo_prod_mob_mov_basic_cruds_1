import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IMobile } from 'src/app/modules/mobile.module';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UuidService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrls: ['./mobile-dashboard.component.scss']
})
export class MobileDashboardComponent implements OnInit {



mobiles: Array<IMobile> = [
  {
    mobileId: '1',
    mobileName: 'iPhone 15',
    brand: 'Apple',
    price: 65000,
    ram: '6GB',
    storage: '128GB',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTBJW5uI6TEhkHrrJzCybsCtLaJeKcx37W5-AnXwWniw&s=10'
  },
  {
    mobileId: '2',
    mobileName: 'Galaxy S24',
    brand: 'Samsung',
    price: 75000,
    ram: '8GB',
    storage: '256GB',
    img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500'
  },
  {
    mobileId: '3',
    mobileName: 'OnePlus 12',
    brand: 'OnePlus',
    price: 58000,
    ram: '12GB',
    storage: '256GB',
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500'
  },
  {
    mobileId: '4',
    mobileName: 'Redmi Note 13',
    brand: 'Xiaomi',
    price: 18000,
    ram: '8GB',
    storage: '128GB',
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500'
  },
  {
    mobileId: '5',
    mobileName: 'Pixel 8',
    brand: 'Google',
    price: 55000,
    ram: '8GB',
    storage: '128GB',
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500'
  }
];


 isInEditMode: boolean = false;
  editId!: string;
  // ViewChild References
  @ViewChild('mobileNameRef')mobileNameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('brandRef')brandRef!: ElementRef<HTMLInputElement>;
  @ViewChild('priceRef')priceRef!: ElementRef<HTMLInputElement>;
  @ViewChild('ramRef')ramRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('storageRef')storageRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('imgRef')imgRef! : ElementRef<HTMLSelectElement>;

  constructor(
    private _uuidService: UuidService,
    private _snackbar: SnackbarService
  ) { }


  ngOnInit(): void {
  }

   // Reset Form
  onReset() {
    this.mobileNameRef.nativeElement.value = '';
    this.brandRef.nativeElement.value = '';
    this.priceRef.nativeElement.value = '';
    this.ramRef.nativeElement.value = '';
    this.storageRef.nativeElement.value = '';
    this.imgRef.nativeElement.value = '';
  }

   // Add Mobile
  onMobileAdd() {

    let newMobile: IMobile = {
      mobileId: this._uuidService.getUuid(),
      mobileName: this.mobileNameRef.nativeElement.value,
      brand: this.brandRef.nativeElement.value,
      price: Number(this.priceRef.nativeElement.value),
      ram: this.ramRef.nativeElement.value,
      storage: this.storageRef.nativeElement.value,
      img: this.imgRef.nativeElement.value
    };

    this.mobiles.unshift(newMobile);

    this.onReset();

    this._snackbar.openSnackbar(
      `Mobile with id ${newMobile.mobileId} added successfully!`
    );
  }

   // Edit Mobile
  onMobileEdit(mobile: IMobile) {

    this.isInEditMode = true;
    this.editId = mobile.mobileId;

    this.mobileNameRef.nativeElement.value = mobile.mobileName;
    this.brandRef.nativeElement.value = mobile.brand;
    this.priceRef.nativeElement.value = mobile.price.toString();
    this.ramRef.nativeElement.value = mobile.ram;
    this.storageRef.nativeElement.value = mobile.storage;
    this.imgRef.nativeElement.value = mobile.img;
  }

  // Update Mobile
  onMobileUpdate() {

    let updatedMobile: IMobile = {
      mobileId: this.editId,
      mobileName: this.mobileNameRef.nativeElement.value,
      brand: this.brandRef.nativeElement.value,
      price: Number(this.priceRef.nativeElement.value),
      ram: this.ramRef.nativeElement.value,
      storage: this.storageRef.nativeElement.value,
      img : this.imgRef.nativeElement.value,
    };

    let getIndex = this.mobiles.findIndex(
      m => m.mobileId === this.editId
    );


    this.mobiles.splice(getIndex, 1, updatedMobile);

    this.onReset();

    this._snackbar.openSnackbar(
      `Mobile with id ${this.editId} updated successfully!`
    );

     this.isInEditMode = false;
    this.editId = '';
  }

  // Delete Mobile
  onMobileDelete(mobileId: string) {

    let getConfirm = confirm(
      `Are you sure you want to delete mobile with id ${mobileId}?`
    );

    if (getConfirm) {

      let removeIndex = this.mobiles.findIndex(
        m => m.mobileId === mobileId
      );
      if (removeIndex !== -1) {
        this.mobiles.splice(removeIndex, 1);

        this._snackbar.openSnackbar(
          `Mobile with id ${mobileId} deleted successfully!`
        );
      }
    }
  }

  // TrackBy
  trackByMobileId(index: number, mobile: IMobile) {
    return mobile.mobileId;
  }

}
