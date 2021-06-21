const { Given } = require('@cucumber/cucumber')
const context = require('../shared-objects/context')

Given(/^I am logged in as (administrator|user)$/, async access => {
    let username, password

    if (access === 'administrator') {
        username = process.env.HOOVER_ADMIN_USERNAME
        password = process.env.HOOVER_ADMIN_PASSWORD
    } else if (access === 'user') {
        username = process.env.HOOVER_USER_USERNAME
        password = process.env.HOOVER_USER_PASSWORD
    }

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
})
