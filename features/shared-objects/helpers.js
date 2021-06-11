const context = require('./context')

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

const waitForMilliseconds = ms => new Promise(resolve => setTimeout(resolve, ms))

const waitForTransitionEnd = async element => {
    await context.page.evaluate(element => {
        return new Promise(resolve => {
            const onEnd = () => {
                element.removeEventListener('transitionend', onEnd)
                resolve()
            }
            element.addEventListener('transitionend', onEnd)
        })
    }, element)
}

module.exports = {
    login,
    waitForMilliseconds,
    waitForTransitionEnd,
}
