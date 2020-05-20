import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'language-translator',
  templateUrl: './languageTranslator.component.html',
  styleUrls: ['./languageTranslator.component.scss']
})

export class LanguageTranslator implements OnInit {
  @Input() TRANSLATIONS: Map<string, string>;

  output_word = '';
  input_word = '';
  onKey(event: any) {
    this.input_word = event.target.value;
    this.output_word = '';
    for (let [key, value] of this.TRANSLATIONS) {
      if(key === this.input_word){
        this.output_word = value;
      }
    }
  }

  ngOnInit() {

  }
}
