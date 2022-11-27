const { By, until } = require("selenium-webdriver");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    await this.driver.get(url);
    
    return this;
  }

  async findByXpath(xpath) {
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), 5000);
  }

  async waitPageLoad(time){
    await this.driver.sleep(time);

    return this;
  }
}

module.exports = BasePage;