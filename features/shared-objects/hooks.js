require('dotenv').config()
const puppeteer = require('puppeteer')
const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber')
const { login } = require('../shared-objects/helpers')
const context = require('../shared-objects/context')

const options = {
    width: 1280,
    height: 1024,
    timeout: 30 * 1000,
}

BeforeAll(async () => {
    context.browser = await puppeteer.launch({
        headless: process.env.HEADLESS !== 'false',
        args: [`--window-size=${options.width},${options.height}`]
    })
    context.page = await context.browser.newPage()
    await context.page.setViewport({ width: options.width, height: options.height })
})

Before({ tags: "@user" }, async () => {
    await login(process.env.HOOVER_USER_USERNAME, process.env.HOOVER_USER_PASSWORD)
})

Before({ tags: "@admin" }, async () => {
    await login(process.env.HOOVER_ADMIN_USERNAME, process.env.HOOVER_ADMIN_PASSWORD)
})

Before({ tags: "@hoover", timeout: options.timeout }, async () => {
    await context.page.goto(process.env.HOOVER_URL, { waitUntil: 'networkidle0' })
})

After(async () => {
    const [logoutElement] = await context.page.$x('//a[starts-with(@href,"/oauth2/sign_out")]')
    await logoutElement.click()
    await context.page.waitForNavigation({ waitUntil: 'networkidle0' })
})

AfterAll(async () => {
    context.browser.close()
})
