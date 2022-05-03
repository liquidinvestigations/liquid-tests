const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('chai')
const context = require('../shared-objects/context')

const clickLink = async linkXPath => {
    const [linkElement] = await context.page.$x(linkXPath)
    await linkElement.click()
    await context.page.waitForNavigation()
}

const clickLinkAsync = async linkXPath => {
    const [linkElement] = await context.page.$x(linkXPath)
    await linkElement.click()
}

const typeInLabeledField = async (text, label) => {
    const inputXPath = `//label[contains(text(), "${label}")]/following-sibling::input`
    const [inputElement] = await context.page.$x(inputXPath)
    await inputElement.focus()
    await context.page.keyboard.type(text)
}

const login = async (username, password) => {
    await context.page.goto(process.env.LIQUID_URL, { waitUntil: 'networkidle0' })

    const [usernameElement] = await context.page.$x('//input[@name="username"]')
    await usernameElement.focus()
    await context.page.keyboard.type(username)

    const [passwordElement] = await context.page.$x('//input[@name="password"]')
    await passwordElement.focus()
    await context.page.keyboard.type(password)

    const [submitElement] = await context.page.$x('//button[@type="submit"]')
    await submitElement.click()

    await context.page.waitForNavigation({ waitUntil: 'networkidle0' })
}

When(/^I click (.+) link$/, async link => {
    await clickLink(`//a[text() = "${link}"]`)
})

When(/^I click (.+) link _blank$/, async link => {
    await clickLinkAsync(`//a[text() = "${link}"]`)
})

When(/^I click (.+) link in (.+) section$/, async (link, section) => {
    await clickLink(`//tr[.//a[text() = "${section}"]]//a[text() = "${link}"]`)
})

When(/^I click (.+) submit button$/, async link => {
    await clickLink(`//input[@type="submit" and @value="${link}"]`)
})

When(/^I click (.+) label$/, async text => {
    const inputXPath = `//label[text()[contains(.,'${text}')]]`
    const [labelElement] = await context.page.$x(inputXPath)
    labelElement.click()
    await context.page.waitForTimeout(3000)
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

When(/^I login as (.+) with password (.+)$/, async (username, password) => {
    await login(username, password)
})

Then(/^I should be logged in as (.+)$/, async username => {
    const [logoutElement] = await context.page.$x(`//*[text() = "Logout (${username})"]`)
    expect(logoutElement).to.exist
})
