import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Language Translator';

  TRANSLATIONS = new Map([
    ['ball', 'pelota'],
    ['house', 'casa'],
    ['dog', 'perro'],
    ['dogs', 'perros'],
    ['milk', 'leche'],
    ['orange', 'naranja'],
  ]);
}
