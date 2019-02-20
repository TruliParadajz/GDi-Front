import { Component, OnInit } from '@angular/core';
import { ToDo } from './ToDo';
import { TODOS } from './todo-list';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  todos : ToDo[];
  checkedNum: number;
  uncheckedNum: number;
  textboxVariable: string;
  deleteBuffNum: number;

  constructor(private dataService: DataService) { }

  updateTodos() {
    this.dataService.getPosts().subscribe(posts => {
      console.log(posts);
      var posts1 = posts as any;
      this.todos = posts1;
      this.ifchecked();
    });

  }

  ngOnInit() {
    this.checkedNum = 0;
    this.uncheckedNum = 0;

    this.updateTodos();    
  }

  ifchecked() {
    this.checkedNum = 0;
    this.uncheckedNum = 0;
  for (var i = 0; i < this.todos.length; i++) {
    if (this.todos[i].check == true) {
      this.checkedNum++;
    }
    else {
      this.uncheckedNum++;
    }
  }
}
  addToDo(todo) {
    //console.log(todo);
    //this.todos.push({ id: this.todos.length + 1, text: todo, checked: false });
    this.dataService.postTodos({ id: this.todos.length + 1, text: todo, check: false }).subscribe(post => {
      this.updateTodos();
    });   

    this.textboxVariable = '';

    this.dataService.getPosts().subscribe(posts => {
      console.log(posts);
      var posts1 = posts as any;
      this.todos = posts1;
    });

    this.ifchecked();

    return this.updateTodos(); 
  }

  deleteToDo(i) {
    //this.todos.splice(i, 1);
    this.dataService.deleteTodos(i).subscribe(post => {
      this.updateTodos();
    });
  }

  toggle(todo) {
    if (todo.check == false) {
      //todo.check = true;
      this.dataService.checkTodo(todo).subscribe(post => {
        //this.updateTodos();
      });
    }
    else {
      //todo.check = false;
      this.dataService.checkTodo(todo).subscribe(post => {
        //this.updateTodos();
      });
    }    
    console.log(todo.id);
  }
  
}
