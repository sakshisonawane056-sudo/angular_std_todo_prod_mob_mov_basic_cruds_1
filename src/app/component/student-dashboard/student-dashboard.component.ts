import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IStudent } from 'src/app/modules/student.module';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UuidService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  studentsArr : Array<IStudent> = [
    {
    fname: 'Rahul',
    lname: 'Patil',
    email: 'rahul@gmail.com',
    contact: '9876543210',
    isActive: 'Yes',
    stdId: 'STD101'
  },
  {
    fname: 'Priya',
    lname: 'Sharma',
    email: 'priya@gmail.com',
    contact: '9876543211',
    isActive: 'No',
    stdId: 'STD102'
  },
  {
    fname: 'Amit',
    lname: 'Deshmukh',
    email: 'amit@gmail.com',
    contact: '9876543212',
    isActive: 'Yes',
    stdId: 'STD103'
  },
  {
    fname: 'Sneha',
    lname: 'Joshi',
    email: 'sneha@gmail.com',
    contact: '9876543213',
    isActive: 'No',
    stdId: 'STD104'
  }
  ]
  isInEditMode : boolean = false;
  editId !: string;
  @ViewChild('fnameRef')fnameRef !: ElementRef<HTMLInputElement>
  @ViewChild('lnameRef')lnameRef !: ElementRef<HTMLInputElement>
  @ViewChild('emailRef')emailRef !: ElementRef<HTMLInputElement>
  @ViewChild('contactRef')contactRef !: ElementRef<HTMLInputElement>
  @ViewChild('isActiveRef')isActiveRef !: ElementRef<HTMLInputElement>

  constructor(
    private _uuidService : UuidService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onStdAdd(){
    let newStd : IStudent = {
    fname : this.fnameRef.nativeElement.value,
    lname : this.lnameRef.nativeElement.value,
    email : this.emailRef.nativeElement.value,
    contact: this.contactRef.nativeElement.value, 
    // isActive: this.isActiveRef.nativeElement.value == 'yes' ? true : false,
    isActive: this.isActiveRef.nativeElement.value == 'yes' ? 'Yes' : 'No',  
    stdId : this._uuidService.getUuid(),
    }

    this.studentsArr.unshift(newStd)
    this.fnameRef.nativeElement.value = ''
    this.lnameRef.nativeElement.value = ''
    this.emailRef.nativeElement.value = ''
    this.contactRef.nativeElement.value = ''
    this.isActiveRef.nativeElement.value = 'yes'
    this._snackbar.openSnackbar(`the student with id ${newStd.stdId} is added succesfully !!!`)
  }

  onStdUpdate(){
    let updatedStd : IStudent = {
    fname : this.fnameRef.nativeElement.value,
    lname : this.lnameRef.nativeElement.value,
    email : this.emailRef.nativeElement.value,
    contact : this.contactRef.nativeElement.value, 
    isActive: this.isActiveRef.nativeElement.value == 'yes' ? 'Yes' : 'No',
    stdId : this.editId
    }
    let getIndex = this.studentsArr.findIndex(u => u.stdId === this.editId);
    this.studentsArr[getIndex] = updatedStd;
    this.fnameRef.nativeElement.value = ''
    this.lnameRef.nativeElement.value = ''
    this.emailRef.nativeElement.value = ''
    this.contactRef.nativeElement.value = ''
    this.isActiveRef.nativeElement.value = 'yes'
    this._snackbar.openSnackbar(`the student with id ${this.editId} is updated succesfully !!!`)
    this.isInEditMode = false;

  }

  onStdEdit(std : IStudent){
    this.isInEditMode = true;
    this.fnameRef.nativeElement.value = std.fname;
    this.lnameRef.nativeElement.value = std.lname;
    this.emailRef.nativeElement.value = std.email;
    this.contactRef.nativeElement.value = std.contact.toString();
    this.isActiveRef.nativeElement.value = std.isActive.toLowerCase();
    this.editId = std.stdId;
  }

  onStdDelete(stdId : string){
    let getConfirm = confirm(`Are you sure, you want to remove the student with id ${stdId} successfully !!`)
    if(getConfirm){
      let removeIndex = this.studentsArr.findIndex(s => s.stdId === stdId)
      this.studentsArr.splice(removeIndex, 1);
      this._snackbar.openSnackbar(`the student with id ${stdId} is removed succesfully !!!`)
    }
  }

  trackByStdId(index : number, std:IStudent){
    return std.stdId
  }
}
