import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersConyainar } from "./users-conyainar/users-conyainar";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UsersConyainar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'mini-Shop';
}
