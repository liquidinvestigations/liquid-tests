const { Given } = require('@cucumber/cucumber')
const context = require('../shared-objects/context')

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

Given(/^I am logged in as administrator$/, async () => {
    await login(process.env.HOOVER_ADMIN_USERNAME, process.env.HOOVER_ADMIN_PASSWORD)
})

Given(/^I am logged in as user$/, async () => {
    await login(process.env.HOOVER_USER_USERNAME, process.env.HOOVER_USER_PASSWORD)
})
