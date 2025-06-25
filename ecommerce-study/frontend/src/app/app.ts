import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";
import { Container } from "./components/container/container";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Container],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
