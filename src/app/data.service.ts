import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './components/task/ToDo';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) {
    console.log('Data service connected...');
  }

  getPosts() {
    return this.http.get('http://localhost:49865/api/todoes');
  }
  postTodos(todo: ToDo) {
    var buffer = todo as any;
    return this.http.post('http://localhost:49865/api/todoes', buffer)
  }
  deleteTodos(id: number) {
    return this.http.delete('http://localhost:49865/api/todoes' + '/' + id)
  }
  checkTodo(todo: ToDo) {
    var buffer = todo as any;
    return this.http.put('http://localhost:49865/api/todoes/' + '/' + todo.id, todo);
  }
}
