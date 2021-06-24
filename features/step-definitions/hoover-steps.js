const fs = require('fs')
const path = require('path')
const { When, Then } = require('@cucumber/cucumber')
const { assert, expect } = require('chai')
const { waitForMilliseconds, waitForTransitionEnd } = require('../shared-objects/helpers')
const context = require('../shared-objects/context')

const downloadPath = path.resolve('.')

const XPath = {
    categories: '//*[@data-test = "categories"]',
    filters: '//*[@data-test = "filters"]',
    result: '//*[@data-test = "result"]',
    sortButton: '//*[@data-test = "sort-button"]',
    sortMenu: '//*[@data-test = "sort-menu"]',
    sizeMenu: '//*[@data-test = "size-menu"]',
    prevPageButton: '//*[@data-test = "prev-results-page"]',
    nextPageButton: '//*[@data-test = "next-results-page"]',
    previewXPath: '//*[@data-test = "doc-view"]',
}

const clickButton = async label => {
    const buttonXPath = `//*[contains(@class, "MuiButton-root")]/span[contains(@class, "MuiButton-label") and contains(text(), "${label}")]`
    const [buttonElement] = await context.page.$x(buttonXPath)
    await buttonElement.click()
}

const resultAt = async position => {
    await context.page.waitForXPath(XPath.result)
    const resultElements = await context.page.$x(XPath.result)
    return resultElements[parseInt(position) - 1]
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

When(/^I type (.+) in (.+) box$/, async (searchQuery, inputLabel) => {
    const searchBoxXPath = `//label[contains(text(), "${inputLabel}")]/following-sibling::*//textarea`
    const [searchBoxElement] = await context.page.$x(searchBoxXPath)
    await searchBoxElement.focus()
    await context.page.keyboard.type(searchQuery.replace('\\n', String.fromCharCode(13)))
})

When(/^I click (.+) MUI button$/, async label => {
    await clickButton(label)
    await context.page.waitForResponse(response => response.status() === 200)
})

When(/^I click (.+) MUI navigation button$/, async label => {
    await clickButton(label)
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
    const [menuElement] = await context.page.$x(XPath.sortMenu)
    await waitForTransitionEnd(menuElement)
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
    const resultElement = await resultAt(position)
    const [resultTitleElement] = await resultElement.$x(`.//*[contains(text(), "${title}")]`)

    expect(resultTitleElement).to.exist
})

Then(/^I (should|should not) see (.+) chip under (Filters|Query)$/, async (see, label, section) => {
    const chipXPath = `//*[text() = "${section}"]/parent::*//*[contains(@class, "MuiChip-root")]//*[text()[contains(.,"${label}")]]`
    const [chipElement] = await context.page.$x(chipXPath)

    if ('should' === see) {
        expect(chipElement).to.exist
    } else if ('should not' === see) {
        expect(chipElement).to.not.exist
    }
})

When(/^I click (.+) select$/, async label => {
    const selectXPath = `//*[./*[text() = "${label}"]]/following-sibling::*//*[contains(@class, "MuiSelect-root")]`
    const [selectElement] = await context.page.$x(selectXPath)
    await selectElement.click()

    await context.page.waitForXPath(XPath.sizeMenu)
    const [menuElement] = await context.page.$x(XPath.sizeMenu)
    await waitForTransitionEnd(menuElement)
})

When(/^I click prev page button$/, async () => {
    const [buttonElement] = await context.page.$x(XPath.prevPageButton)
    await buttonElement.click()

    await context.page.waitForResponse(response => response.status() === 200)
})

When(/^I click next page button$/, async () => {
    const [buttonElement] = await context.page.$x(XPath.nextPageButton)
    await buttonElement.click()

    await context.page.waitForResponse(response => response.status() === 200)
})

When(/^I click (\d+)(?:st|nd|rd|th) result$/, async position => {
    const resultElement = await resultAt(position)
    await resultElement.click()

    await context.page.waitForResponse(response => response.status() === 200)
    await waitForTransitionEnd(resultElement)
})

Then(/^I should see (\d+)(?:st|nd|rd|th) result to be highlighted$/, async position => {
    const resultElement = await resultAt(position)
    const resultElementBorder = await resultElement.evaluate(node => getComputedStyle(node).border)

    expect(resultElementBorder).to.satisfy(style => style.startsWith('2px'))
})

Then(/^I should document in the preview$/, async () => {
    const [previewElement] = await context.page.$x(XPath.previewXPath)

    expect(previewElement).to.exist
})

When(/^I click (.+) button on (\d+)(?:st|nd|rd|th) result$/, async (title, position) => {
    const resultElement = await resultAt(position)
    const [resultButtonElement] = await resultElement.$x(`.//*[@title = "${title}"]//a`)
    await context.page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    })
    await resultButtonElement.click()

    await waitForMilliseconds(3000) // wait for download
})

Then(/^I should see (\d+)(?:st|nd|rd|th) result file downloaded$/, async position => {
    const resultElement = await resultAt(position)
    const [resultDownloadElement] = await resultElement.$x(`.//*[@title = "Download original file"]//a`)
    const resultDownloadHref = await resultDownloadElement.evaluate(node => node.getAttribute('href'))
    const filename = resultDownloadHref.split('/').pop()
    const filePath = path.resolve('.', filename)

    expect(fs.existsSync(filePath)).to.be.true

    fs.unlinkSync(filePath)
})

When(/^I press (.) navigation hotkey$/, async key => {
    await context.page.keyboard.type(key.toLowerCase())
})

When(/^I press (.) hotkey$/, async key => {
    await context.page.keyboard.type(key.toLowerCase())
    await context.page.waitForResponse(response => response.status() === 200)
})

When(/^I click (.+) button on preview$/, async title => {
    await context.page.waitForXPath(XPath.previewXPath)
    const [previewElement] = await context.page.$x(XPath.previewXPath)

    const buttonXPath = `.//*[@title = "${title}"]`
    await context.page.waitForXPath(`${XPath.previewXPath}//*[${buttonXPath}]`)

    await context.page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    })

    const [buttonElement] = await previewElement.$x(buttonXPath)
    await buttonElement.click()

    await waitForMilliseconds(1000) // wait for action
})

Then(/^I should see a new tab open$/, async () => {
    await waitForMilliseconds(1000) // wait for tab to open
    const pages = await context.browser.pages()

    assert.equal(pages.length, 2)

    await pages[pages.length - 1].close()
})
