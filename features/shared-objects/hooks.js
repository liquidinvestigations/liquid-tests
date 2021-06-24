require('dotenv').config()
const puppeteer = require('puppeteer')
const { After, BeforeAll, AfterAll } = require('@cucumber/cucumber')
const context = require('../shared-objects/context')

const options = {
    width: 1280,
    height: 1024,
    timeout: 30 * 1000,
}

BeforeAll(async () => {
    context.browser = await puppeteer.launch({
        headless: process.env.HEADLESS !== 'false',
        args: [`--window-size=${options.width},${options.height}`],
    })
    const pages = await context.browser.pages()
    context.page = pages[0]
    await context.page.setViewport({ width: options.width, height: options.height })
})

After(async () => {
    const client = await context.page.target().createCDPSession()
    await client.send('Network.clearBrowserCookies')
})

AfterAll(async () => {
    context.browser.close()
})
