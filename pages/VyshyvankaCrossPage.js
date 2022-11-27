const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class VyshyvankaCrossPage extends BasePage {
  async addItemToCart(){
    const button = await this.findByXpath(`//*[@class='product-info-add-to-cart']`);
    await button.click();

    return this;
  }

  async deleteItemFromTheCart(){
    const button = await this.findByXpath(`//*[@class='modal__cart-product-remove']`)
    await button.click();

    return this;
  }

  async selectSize(size){
    const button = await this.findByXpath(`//button[contains(text(), '${size}')]`);
    await button.click();

    return this;
  }

  async getProductNameElement(){
    await this.driver.sleep(2000);

    return this.findByXpath(`//*[@class='modal__cart-product-name hoverable']`);
  }

  async getProductPriceElement(){
    await this.driver.sleep(2000);

    return this.findByXpath(`//*[@class='modal__cart-product-price-actual']`);
  }

  async getProductSelectedSizeElement(){
    await this.driver.sleep(2000);

    return this.findByXpath(`//button[@type='button' and @active='true']`);
  }

  async getTotalPriceElement(){
    await this.driver.sleep(2000);

    return this.findByXpath(`//*[@class='modal__cart-total-cost-value']`);
  }
}

module.exports = VyshyvankaCrossPage;