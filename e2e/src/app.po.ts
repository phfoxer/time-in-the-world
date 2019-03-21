import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getWebSiteTitle() {
    return element(by.tagName('header')).getText();
  }

  navigateToSectionPage() {
    return browser.get('/section/world');
  }

  verifySectionPage() {
    return element(by.id('sectionName')).getText();
  }

  moreThanThree() {
    return element.all(by.tagName('app-article-item')).count();
  }
}
