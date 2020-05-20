import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {LanguageTranslator} from './languageTranslator.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
const Bluebird = require('bluebird');

describe('LanguageTranslator', () => {
  let component: LanguageTranslator;
  let fixture: ComponentFixture<LanguageTranslator>;
  let appInput;
  let appOutput;

  const pushValue = async (value, fixture) => {
    appInput.value = value;
    appInput.dispatchEvent(new Event('change'));
    appInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  const getByTestId = (testId: string, compiled) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };


  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [LanguageTranslator]
      })
      .compileComponents();
  }));

  const factory = (translations) => {
    const fixture: ComponentFixture<LanguageTranslator> = TestBed.createComponent(LanguageTranslator);
    const component: LanguageTranslator = fixture.componentInstance;
    component.TRANSLATIONS = translations;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled
    };
  };

  const translations = new Map([
    ['cat', 'gato']
  ]);

  const nonExistingTranslations = ['ca', 'ma', 'x', 'vines', 'mans', 'trawberry'];

  it('Initial UI is rendered as expected', async () => {
    const {compiled, fixture} = factory(translations);
    await fixture.whenStable();
    appInput = getByTestId('app-input', compiled);
    appOutput = getByTestId('app-output', compiled);
    console.log(appInput);
    return;
  });

  it('Test with existing translations', async () => {
    const {compiled, fixture} = factory(translations);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);
    appOutput = getByTestId('app-output', compiled);

    expect(appOutput.hasAttribute('readOnly')).toBe(true);

    Bluebird.each(translations, async (translation) => {
      await pushValue(translation[0], fixture);
      await fixture.detectChanges();
      expect(appOutput.value).toBe(translation[1]);
    });
  });

  it('Test with non-existing translations', async () => {
    const {compiled, fixture} = factory(translations);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);
    appOutput = getByTestId('app-output', compiled);

    expect(appOutput.hasAttribute('readOnly')).toBe(true);

    Bluebird.each(nonExistingTranslations, async (translation) => {
      await pushValue(translation[0], fixture);
      await fixture.detectChanges();
      expect(appOutput.value).toBe('');
    });
  })

  it('Test with existing translation followed by non-existing translations', async() => {
    const {compiled, fixture} = factory(translations);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);
    appOutput = getByTestId('app-output', compiled);

    expect(appOutput.hasAttribute('readOnly')).toBe(true);

    await pushValue('cat', fixture);
    await fixture.detectChanges();
    expect(appOutput.value).toBe('gato');

    await pushValue('vines', fixture);
    await fixture.detectChanges();
    expect(appOutput.value).toBe('');
  });

  it('Test with non-existing translation followed by existing translations', async() => {
    const {compiled, fixture} = factory(translations);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);
    appOutput = getByTestId('app-output', compiled);

    expect(appOutput.hasAttribute('readOnly')).toBe(true);

    await pushValue('vines', fixture);
    await fixture.detectChanges();
    expect(appOutput.value).toBe('');

    await pushValue('cat', fixture);
    await fixture.detectChanges();
    expect(appOutput.value).toBe('gato');
  });
});
