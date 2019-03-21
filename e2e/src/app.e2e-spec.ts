import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title name', () => {
    page.navigateTo();
    expect(page.getWebSiteTitle()).toEqual('The TW Times');
  });

  it('Section page exists', () => {
    page.navigateToSectionPage();
    expect(page.verifySectionPage()).toEqual('World');
  });

  it('Exists more than three articles', () => {
    page.navigateToSectionPage();
    expect(page.moreThanThree()).toBeGreaterThan(3);
  });


});
