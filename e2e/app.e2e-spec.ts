import { EmailFormPage } from './app.po';

describe('email-form App', function() {
  let page: EmailFormPage;

  beforeEach(() => {
    page = new EmailFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
