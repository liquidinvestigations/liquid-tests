const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('chai')
const context = require('../shared-objects/context')

const clickLink = async linkXPath => {
    const [linkElement] = await context.page.$x(linkXPath)
    await linkElement.click()
    await context.page.waitForNavigation()
}

const typeInLabeledField = async (text, label) => {
    const inputXPath = `//label[contains(text(), "${label}")]/following-sibling::input`
    const [inputElement] = await context.page.$x(inputXPath)
    await inputElement.focus()
    await context.page.keyboard.type(text)
}

When(/^I click (.+) link$/, async link => {
    await clickLink(`//a[text() = "${link}"]`)
})

When(/^I click (.+) link in (.+) section$/, async (link, section) => {
    await clickLink(`//tr[.//a[text() = "${section}"]]//a[text() = "${link}"]`)
})

When(/^I click (.+) submit button$/, async link => {
    await clickLink(`//input[@type="submit" and @value="${link}"]`)
})

When(/^I click (.+) on the list$/, async link => {
    await clickLink(`//th/a[text() = "${link}"]`)
})

When(/^I type (.+) in (.+) field$/, typeInLabeledField)

Then(/^I (can|can not) see (.+) on the list$/, async (see, link) => {
    const [linkElement] = await context.page.$x(`//th/a[text() = "${link}"]`)

    if ('can' === see) {
        expect(linkElement).to.exist
    } else if ('can not' === see) {
        expect(linkElement).to.not.exist
    }
})
