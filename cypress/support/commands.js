
const { MailSlurp } = require('mailslurp-client');
const mailslurp = new MailSlurp({ apiKey: "20d13f9c737fcc442caa145a1eb3757e3f90a407d8851558670fbe635e5dd978" });
//57ba865941de9c0a5c0153dc8b6157fbb25ac63a137a2c176ea73459819d5852 == for christain@greenwoodcampbell.com with Phone number and cancel your subscription
//20d13f9c737fcc442caa145a1eb3757e3f90a407d8851558670fbe635e5dd978 == for chinwubannaemeka2015@gmail.com
Cypress.Commands.add('createInbox', () => {
    return mailslurp.createInbox()
})

Cypress.Commands.add('waitForLatestEmail', (inboxId) => {
    const timeoutMillis = 300000;
    return mailslurp.waitForLatestEmail(inboxId, timeoutMillis)
})