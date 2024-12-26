import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-registration';
}
