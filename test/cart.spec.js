const { expect } = require("chai");
const { Browser, Builder, Capabilities } = require("selenium-webdriver");
require("chromedriver");

const VyshyvankaCrossPage = require("../pages/VyshyvankaCrossPage");

describe("Adding and deleting items from cart.", () => {
  const pageUrl = "https://jolybell.com/product/120";
  const expectedProductPrice = '29.78 USD';
  const expectedProductName = 'Вышиванка Крест';
  const expectedTotalPrice = '0 USD';

  beforeEach(async function () {
    let chromeCapabilities = Capabilities.chrome();
    const options = {
    args: [
        '--test-type', 
        '--incognito',
        '--start-maximized'
        ]
    }
    chromeCapabilities.set("goog:chromeOptions", options);
    this.driver = await new Builder().forBrowser(Browser.CHROME).withCapabilities(chromeCapabilities).build();
  });

  it("Should add exact item to the cart.", async function () {
    const vyshyvankaCrossPage = new VyshyvankaCrossPage(this.driver);
    await vyshyvankaCrossPage.openPage(pageUrl);
    await vyshyvankaCrossPage.waitPageLoad(5000);
    await vyshyvankaCrossPage.selectSize('M');
    await vyshyvankaCrossPage.addItemToCart();

    const productName = await vyshyvankaCrossPage.getProductNameElement();
    const productNameText = await productName.getText();
    expect(productNameText).to.be.equal(expectedProductName);

    const productPrice = await vyshyvankaCrossPage.getProductPriceElement();
    const productPriceText = await productPrice.getText();
    expect(productPriceText).to.be.equal(expectedProductPrice);

    const isProductSelectedSize = await vyshyvankaCrossPage.getProductSelectedSizeElement() ? true : false;
    expect(isProductSelectedSize).to.be.true;
  }).timeout(50000);

  it("Should delete item from the cart.", async function () {
    const vyshyvankaCrossPage = new VyshyvankaCrossPage(this.driver);
    await vyshyvankaCrossPage.openPage(pageUrl);
    await vyshyvankaCrossPage.waitPageLoad(5000);
    await vyshyvankaCrossPage.selectSize('M');
    await vyshyvankaCrossPage.addItemToCart();
    await vyshyvankaCrossPage.deleteItemFromTheCart();

    const totalPrice = await vyshyvankaCrossPage.getTotalPriceElement();
    const totalPriceText = await totalPrice.getText();
    expect(totalPriceText).to.be.equal(expectedTotalPrice);
  }).timeout(50000);

  afterEach(async function () {
    await this.driver.quit();
  });
});