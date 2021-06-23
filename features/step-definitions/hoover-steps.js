const { When, Then } = require('@cucumber/cucumber')
const { assert, expect } = require('chai')
const { waitForMilliseconds, waitForTransitionEnd } = require('../shared-objects/helpers')
const context = require('../shared-objects/context')

const XPath = {
    categories: '//*[@data-test = "categories"]',
    filters: '//*[@data-test = "filters"]',
    searchInput: '//label[text() = "Search"]/following-sibling::*//textarea',
    result: '//*[@data-test = "result"]',
    sortButton: '//*[@data-test = "sort-button"]',
    sortMenu: '//*[@data-test = "sort-menu"]',
}

When(/^I click (.+) category$/, async category => {
    const categoryXPath = `${XPath.categories}//*[text() = "${category}"]`
    await context.page.waitForXPath(categoryXPath)
    const [categoryElement] = await context.page.$x(categoryXPath)
    await categoryElement.click()

    //const [filtersElement] = await context.page.$x(XPath.filters)
    //await waitForTransitionEnd(filtersElement)

    await waitForMilliseconds(1000) // wait for long lists to render
})

When(/^I click (.+) filter$/, async filter => {
    const filterXPath = `${XPath.filters}//*[contains(@class, "MuiButtonBase-root") and .//*[text() = "${filter}"]]`
    await context.page.waitForXPath(filterXPath)
    const [filterElement] = await context.page.$x(filterXPath)
    await filterElement.click()

    const collapseXPath = `${filterXPath}/preceding-sibling::*[contains(@class, "MuiCollapse-container")]`
    await context.page.waitForXPath(collapseXPath)
    const [collapseElement] = await context.page.$x(collapseXPath)
    await waitForTransitionEnd(collapseElement)
})

When(/^I click (.+) bucket$/, async bucket => {
    const bucketXPath = `${XPath.filters}//*[contains(@class, "MuiList-root")]//*[text() = "${bucket}"]`
    await context.page.waitForXPath(bucketXPath)
    const [bucketElement] = await context.page.$x(bucketXPath)
    await bucketElement.click()

    await context.page.waitForResponse(response => response.status() === 200)
})

When(/^I type (.+) in search box$/, async searchQuery => {
    const [searchBoxElement] = await context.page.$x(XPath.searchInput)
    await searchBoxElement.focus()
    await context.page.keyboard.type(searchQuery)
})

When(/^I click (.+) MUI ajax button$/, async label => {
    const buttonXPath = `//*[contains(@class, "MuiButton-root")]/span[contains(@class, "MuiButton-label") and contains(text(), "${label}")]`
    const [buttonElement] = await context.page.$x(buttonXPath)
    await buttonElement.click()

    await context.page.waitForResponse(response => response.status() === 200)
})

When(/^I click (.+) MUI navigation button$/, async label => {
    const buttonXPath = `//*[contains(@class, "MuiButton-root")]/span[contains(@class, "MuiButton-label") and contains(text(), "${label}")]`
    const [buttonElement] = await context.page.$x(buttonXPath)
    await buttonElement.click()

    await context.page.waitForNavigation()
})

Then(/^I should visit (.+) URL$/, async url => {
    const currentUrl = await context.page.url()

    assert.equal(currentUrl, url)
})

Then(/^I should see (\d+) result(?:s?)$/, async count => {
    await context.page.waitForXPath(XPath.result)
    const resultElements = await context.page.$x(XPath.result)

    assert.equal(resultElements.length, count)
})

When(/^I click sort button$/, async () => {
    const [buttonElement] = await context.page.$x(XPath.sortButton)
    await buttonElement.click()

    await context.page.waitForXPath(XPath.sortMenu)
    const [collapseElement] = await context.page.$x(XPath.sortMenu)
    await waitForTransitionEnd(collapseElement)
})

When(/^I click (.+) menu item$/, async label => {
    const menuItemXPath = `//*[contains(@class, "MuiMenu-paper")]/ul/li[contains(@class, "MuiMenuItem-root") and contains(text(), "${label}")]`
    const [menuItemElement] = await context.page.$x(menuItemXPath)
    await menuItemElement.click()

    await context.page.waitForResponse(response => response.status() === 200)
})

Then(/^I shoud see (.+) chip next to sort button$/, async label => {
    const chipXPath = `${XPath.sortButton}/parent::*//*[contains(@class, "MuiChip-root")]//*[contains(text(), "${label}")]`
    const [chipElement] = await context.page.$x(chipXPath)

    expect(chipElement).to.exist
})

Then(/^I should see (.+) result on (\d+)(?:st|nd|rd|th) position$/, async (title, position) => {
    await context.page.waitForXPath(XPath.result)
    const resultElements = await context.page.$x(XPath.result)
    const [resultElement] = await resultElements[parseInt(position) - 1].$x(`.//*[contains(text(), "${title}")]`)

    expect(resultElement).to.exist
})

Then(/^I should see (.+) chip under (Filters|Query)$/, async (label, position) => {
    const chipXPath = `//*[text() = "${position}"]/parent::*//*[contains(@class, "MuiChip-root")]//*[text()[contains(.,"${label}")]]`
    const [chipElement] = await context.page.$x(chipXPath)

    expect(chipElement).to.exist
})
