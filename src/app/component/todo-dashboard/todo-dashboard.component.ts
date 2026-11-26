import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from 'src/app/modules/todo.module';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UuidService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {

  @ViewChild('todoItemRef') todoItemRef !: ElementRef


  todosArr : Array<Itodo>=[
    {
      todoItem : 'JS',
      todoId : "1234"
    },
    {
      todoItem : 'TS',
      todoId : "1235"
    }
  ]

  isInEditMode : boolean = false;
  private editId !: string;

  constructor(
    private _uuidService : UuidService,
    private _snackbar :SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onTodoAdd(){
    let todo : Itodo = {
      todoItem : this.todoItemRef.nativeElement.value,
      todoId : this._uuidService.getUuid()
    }
    this.todosArr.unshift(todo)
    this.todoItemRef.nativeElement.value = ''
    this._snackbar.openSnackbar('new todo item added successfully !!!')
  }

  onTodoDelete(todoId : string){
    let getConfirmation = confirm(`Are you sure you want to delete this todo item with id ${todoId} ?`)
    if(getConfirmation){
      let removeIndex = this.todosArr.findIndex((todo) => todo.todoId === todoId);
      this.todosArr.splice(removeIndex, 1)
      this._snackbar.openSnackbar(`new todo item with id ${todoId} is remove successfully !!!`)
    }
  }

  onTodoEdit(todo : Itodo){
    this.editId = todo.todoId
    this.todoItemRef.nativeElement.value = todo.todoItem;
    this.isInEditMode = true;
  }

  onTodoUpdate(){
    let updatedTodo : Itodo = {
      todoItem : this.todoItemRef.nativeElement.value,
      todoId : this.editId
    }
    let getIndex = this.todosArr.findIndex(todo => todo.todoId === this.editId);
    this.todosArr[getIndex] = updatedTodo;

    this.todoItemRef.nativeElement.value = '';
    this.isInEditMode = false;
    this._snackbar.openSnackbar(`new todo item with id ${this.editId} is updated successfully !!!`)
  }

}
