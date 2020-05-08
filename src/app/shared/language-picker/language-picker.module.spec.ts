import { LanguagePickerModule } from './language-picker.module';

describe('LanguagePickerModule', () => {
  let languagePickerModule: LanguagePickerModule;

  beforeEach(() => {
    languagePickerModule = new LanguagePickerModule();
  });

  it('should create an instance', () => {
    expect(languagePickerModule).toBeTruthy();
  });
});
