import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import PageObjectCy from "../../PageObject/PageObject.cy";

let inboxId
let emailAddress
let emailBody
var phone_number = "07946268462";
var phone_2 = "07588014468";

Then(/^I should be on STEP login page$/, () => {
    cy.visit('/')
    PageObjectCy.STEPlOGO().should('exist')
});

//I create an Admin Parent User Profile
When(/^I'm on STEP home page and I click the create account menu link$/, () => {
    PageObjectCy.STEPlOGO().should('exist')
    PageObjectCy.CreateAccountLink().click()
});

Then(/^The sign up to STEP page will display$/, () => {
    cy.location('pathname').should('include', '/sign-up')
    cy.get('.row > :nth-child(1) > .mb-3').contains('Sign up to STEP').should('exist')
    cy.get('.list-standard > :nth-child(1)')
        .contains('Please follow these steps to create your family account and complete the TAYC-R Therapeutic Questionnaire.')
});

When(/^I enter my email on the Email address field$/, () => {
    cy.createInbox().then((inbox) => {
        inboxId = inbox.id
        emailAddress = inbox.emailAddress
        PageObjectCy.Create_AccountEmail().should('exist').type(emailAddress)
        //cy.get(':nth-child(1) > span > .form-control').should('exist').type(emailAddress);
    })
});

When(/^I enter create password and confirm password$/, () => {
    PageObjectCy.Create_AccountPass().type('Testing#123')
    PageObjectCy.Create_AccountConPass().type('Testing#123')
});

When(/^I accept the Terms and Conditions$/, () => {
    cy.get('input[name="checkboxTos"]').check()
});

When(/^I click the sign up button$/, () => {
    PageObjectCy.SignUpButton().click({ force: true })
});

Then(/^The system should display Thank you for signing up to STEP.Please visit your inbox to verify your email message.$/, () => {
    cy.get('.card-body > .mb-3').should('exist').contains('Verify your email')
    cy.get('.card-body > .lead').should('exist').contains('Thank you for signing up to STEP. Please visit your inbox to verify your email.')
});

When(/^I click on the verify email now button in my inbox$/, () => {
    cy.waitForLatestEmail(inboxId, 30000, true).then((email) => {
        const emailBody = email.body
        const parser = new DOMParser();
        const doc = parser.parseFromString(emailBody, 'text/html')
        const anchor = doc.querySelector('a')
        const href = anchor.href
        cy.visit(href)
    })
});

Then(/^I should be redirected to the email confirmed 2-step verification with your phone screen$/, () => {
    cy.location('pathname').should('include', '/confirm-account')
    cy.get('.anim-load1').should('exist').contains('Email confirmed')
});

Then(/^I enter my phone number and click submit button$/, () => {

    cy.get('input[name="phone"]').type(phone_number, { force: true })
    cy.get('button.btn.btn-warning.btn-lg.btn-block').contains('Submit').click({ force: true })
});

Then(/^The system should send a 6-digit verification code to my phone number$/, () => {
    cy.wait(2000)
    cy.request('https://receive-smss.com/sms/447946268462/')
        .then(html => {
            const OTPCode = html.body.match(/.*Your STEP verification code is*./)
            const Code = OTPCode[0].match(/<b>\d+/)
            console.log(Code)
            console.log(OTPCode)
            return Code[0].match(/\d+/)[0]
        }).then(otp => {
            cy.log(otp);
            cy.get('.form-control').should('exist').type(otp)
            //PageObjectCy.LoginVerfiyCode().should('exist').type(otp)
        })

});

When(/^I enter the verification code and click verify button$/, () => {
    cy.get('button.btn.btn-warning.btn-lg.btn-block').contains('Verify').click({ force: true })
});

Then(/^I should be redirected to the admin parent user Dashboard.$/, () => {
    cy.location('pathname').should('include', '/dashboard/')
    cy.get('.anim-load1').contains('Welcome to your Dashboard!').should('exist')
});

//Admin Parent User Forgot Password Reset
When(/^I click the Sign in link and navigate to the sign in page.$/, () => {
    PageObjectCy.STEPlOGO().should('exist')
    PageObjectCy.SignInlink().should('exist').click({ force: true })
    cy.location('pathname').should('include', '/sign-in')
});

Then(/^I'm on the sign in to STEP screen will display and i click the Forgot your password link$/, () => {
    cy.get('.mb-4 > .mb-3').contains('Sign in to STEP').should('exist')
    PageObjectCy.Login_Email().should('be.visible')
    PageObjectCy.Login_Password().should('be.visible')
    PageObjectCy.ForgotPassword().click({ force: true })
});

Then(/^Reset your password screen will display$/, () => {
    cy.get('h1').contains('Reset your password').should('exist')
    PageObjectCy.ResetEmailField().should('exist')
});

Then(/^I enter Your email and click Reset password button$/, () => {
    cy.createInbox().then((inbox) => {
        inboxId = inbox.id
        emailAddress = inbox.emailAddress
        PageObjectCy.ResetEmailField().type(emailAddress)
    })
    //PageObjectCy.ResetEmailField().type('christian+kwasi1@greenwoodcampbell.com')
    PageObjectCy.ResetpasswordButton().click({ force: true })
});

Then(/^The system will display a message "([^"]*)"$/, (args1) => {
    cy.get('.card-body').find('h4')
        .contains('If your account exists, a password reset email is on its way to you.')
});

// Then(/^I verify the reset password link is sent to the email and I click on the reset password link$/, () => {
//     cy.waitForLatestEmail(inboxId, 30000, true).then((email) => {
//         const emailBody = email.body
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(emailBody, 'text/html')
//         const anchor = doc.querySelector('a')
//         const href = anchor.href
//         cy.visit(href)
//     })
// });

// When(/^I enter the current password and new password and confirm password$/, () => {
//     cy.location('pathname').should('include', '/password-reset')
//     cy.get('h1').contains('create new password').should('exist')
//     cy.get('input[name="password"]').should('have.attr', 'placeholder', 'class').type('Qwerty#123')
//     cy.get('input[name="passwordConfirm"]').should('have.attr', 'class').type('Qwerty#123')
// });

// When(/^I Click reset password button.$/, () => {
//     //cy.get('button.btn.btn-warning.btn-Ig.btn-block').should('exist').click({force:true})
//     PageObjectCy.ResetpasswordButton().should('exist')
//         .contains('Reset password')
//         .click({ force: true })
// });

// Then(/^The system should reset my password$/, () => {
//     return true;
// });

//Admin parent user login 
When(/^I navigate to the STEP home page and I click the Sign in link$/, () => {
    PageObjectCy.STEPlOGO().should('exist')
    PageObjectCy.SignInlink().click({ force: true })
});

Then(/^I should see the Sign in to Step and i enter admin user email and password$/, () => {
    PageObjectCy.Login_Email().type('christian+emeka@greenwoodcampbell.com')
    PageObjectCy.Login_Password().type('Qwerty#123')
});

Then(/^I click the sign in button, the system will send a verification code to the registered phone number$/, () => {
    PageObjectCy.SignInButton().click({ force: true })
});

When(/^I enter the verification code and click Verify and sign in button$/, () => {
    //Number to use ==> "07868135628"
    cy.request('https://receive-smss.com/sms/447868135628/')
        .then(html => {
            // const parser = new DOMParser();
            // cy.wait(3000)
            // cy.get('h3').should('exist').contains('United Kingdom mobile phone number.')
            cy.document().invoke({ log: false }, 'write', html)
            const OTPCode = html.body.match(/.*Your STEP verification code is:*./)
            const Code = OTPCode[0].match(/<b>\d+/)
            return Code[0].match(/\d+/)[0]
        })
        .then(otp => {
            cy.log(otp)
            cy.get('input[name="verificationCode"]').should('exist').type(otp)
        })
});

Then(/^I should be on the admin parent user Dashboard and I should see family profile, TAYC-R and Your report Information Card.$/, () => {
    //verify the admin user dashboard view
    cy.get('a[href="/dashboard"').contains('Go to Dashboard').click()
});

//Admin User complete the TAYC-R questionnaire and sets up the profile
Given(/^I create a new Admin Parent User Profile and I on the admin parent user Dashboard$/, () => {
    return true;
});

Then(/^I click the TAYC-R Questionnarie Let's start button$/, () => {
    return true;
    cy.get('a[href="/survey/family-parent/"]').click();
    cy.get('.box-btn > .btn').contains("Let's start").click()
});

When(/^Please read this carefully pop-up displays and I click I understand button$/, () => {
    return true;
    cy.get('.mb-3 > .d-flex > .btn')
    cy.get('button.btn.btn-block.btn-lg.btn-warning').contains('I understand').click({ force: true })
});

Then(/^I see the Family and Parent proflie forms$/, () => {
    return true;
    //fill all this family forms
});

When(/^I fill all the required family forms and Click Submit$/, () => {
    return true;
    //fill all this family forms
    cy.get(':nth-child(2) > .col-6 > span > .form-control').type([postcode])
    cy.get(':nth-child(3) > .col-6 > span > .form-control').type('how many adpoted children')
    cy.get('.btn').contains('submit and go to next step').click()
});

Then(/^I should be on the child profile and I fill all the requires fields and Click Submit.$/, () => {
    return true;
    cy.get(':nth-child(1) > span > .form-control') //Child's first name
    cy.get(':nth-child(2) > span > .v-select') //Gender field
    //fill all required forms
    cy.get(':nth-child(16) > span > .v-select') //Does your child still live with you
    cy.get(':nth-child(17) > span > .v-select') //what is your child adoption status
    cy.get(':nth-child(3) > .col-12 > .btn').contains('submit and go to next step')
    cy.get(':nth-child(2) > .btn').contains('submit and finish').click()
});

When(/^I navigate to the TAYC-R Questionnaire screen and i fill the Questionnaire$/, () => {
    return true;
});

When(/^I click submit and finish button$/, () => {
    return true;
});

Then(/^The system should display a Thank you for completing the TAYC-R Therapeutic Questionnaire $/, () => {
    return true;
    //cy.get('.anim-load1').contians('text')
});

Then(/^I click the view results button$/, () => {
    return true;
    //cy.get('.btn').contians('view results')
});

Then(/^I should see the family profiles and the adopted children profiles $/, () => {
    return true;
    //cy.get('.box-btn') cy.get(':nth-child(1) > .card-body')
});

//Admin Parent User invite another parent user
Given(/^I login and navigate to the Admin Parent Dashboard$/, () => {
    PageObjectCy.STEPlOGO().should('exist')
    PageObjectCy.SignInlink().should('exist').click({ force: true })
    cy.location('pathname').should('include', '/sign-in')
    PageObjectCy.Login_Email().type('christian+nonso@greenwoodcampbell.com')
    PageObjectCy.Login_Password().type('Qwerty#123')
    PageObjectCy.SignInButton().click({ force: true })
    PageObjectCy.LoginVerfiyCode().should('exist').type('632123')
    cy.get('button.btn.btn-warning.btn-lg.btn-block').contains('verify and sign in').click({ force: true })
});

Then(/^I click the Family profiles Icon and the Family profile page opens$/, () => {
    return true;
    cy.location('pathname').should('include', '/dashboard')
});

Then(/^I click Add adoptive parent button$/, () => {
    return true;
});

Then(/^Invite additional adoptive parent to your family profiles pop-up dialog will display$/, () => {
    return true;
});

When(/^I enter the additional adoptive parent email$/, () => {
    return true;
});

When(/^I click Send Invite button.$/, () => {
    return true;
});

Then(/^System will display invite sent and send Welcome to STEP! email.$/, () => {
    return true;
});

Given(/^I login and navigate to the Admin Parent Dashboard.$/, () => {
    return true;
});

When(/^I click the view Family profile button and the family profile page opens$/, () => {
    return true;
});

When(/^I click the Add child button and the child profile open$/, () => {
    return true;
});

When(/^I fill all the required Child fields$/, () => {
    return true;
});

When(/^I click Submit and go to next step button$/, () => {
    return true;
});

Then(/^I should be redirected to the TAY-R Questionnarie page$/, () => {
    return true;
});

When(/^I all the questionnaires and I click the Submit button$/, () => {
    return true;
});

Then(/^I should see two buttons Add another child profile and Submit and finish button$/, () => {
    return true;
});

Then(/^I click the Submit and finish button$/, () => {
    return true;
});

Then(/^The system should display Thank you for completing the TAYC-R Therapeutic Questionnaire$/, () => {
    return true;
});
// Given(/^I login and I click the Go to Dashboard button$/, () => {
// return true;
// });

Then(/^I'm on the Dashboard and I click the family profile icon$/, () => {
    return true;
});

Then(/^I navigate to the family profile page and I click a parent user Icon.$/, () => {
    return true;
});

Then(/^Remove this parent button will display and I click it.$/, () => {
    return true;
});

Then(/^A confirmation pop-up box will display and I click Yes remove button$/, () => {
    return true;
});

Then(/^The system will display a message Parent remove and the parent record will disappear from the family profile.$/, () => {
    return true;
});

// Given(/^I login and I click the Go to Dashboard button$/, () => {
// return true;
// });

Then(/^Am on the Dashboard and I click the family profile icon$/, () => {
    return true;
});

Then(/^I navigate to the family profile page.$/, () => {
    return true;
});

When(/^I click on the Child edit profile button$/, () => {
    return true;
});

Then(/^The edit child profile page will open$/, () => {
    return true;
});

Then(/^Make a change to the childs profile and click update button$/, () => {
    return true;
});

Then(/^The system will display a message Child update successful.$/, () => {
    return true;
});

//I navigate to the site main menu
When(/^I click the FAQs menu then I should be redirected to the FAQ page$/, () => {
    cy.get('nav > a[href*="/faq"]').should('exist').click()
    cy.location('pathname').should('include', '/faq')
    cy.get('.col-12').find('h1').contains(' Frequently Asked Questions ')
    cy.go('back')
});

Then(/^I click on the Create account menu link then I should be redirected to the sign up in to STEP screen$/, () => {
    PageObjectCy.CreateAccountLink().should('exist').click()
    cy.location('pathname').should('include', '/sign-up')
    cy.get('.row > :nth-child(1) > .mb-3').contains('Sign up to STEP').should('exist')
    cy.go('back')
});

Then(/^I click on the Sign in menu link then I should be redirected to the sign in to STEP screen$/, () => {
    PageObjectCy.SignInlink().should('exist').click()
    cy.location('pathname').should('include', '/sign-in')
    cy.get('.mb-4 > .mb-3').contains('Sign in to STEP').should('exist')
    cy.go('back')
});
//I navigate to the site footer menu
Then(/^I should see all the "([^"]*)" list$/, (args1) => {
    cy.get('.footer').scrollIntoView()
    const footermenu = ['Sign in', 'Create account', 'FAQs', 'About Adoptionplus', 'Contact us', 'Privacy Policy', 'Terms of Use'];
    footermenu.forEach(args1 => {
        cy.get('.footer-links')
            .find('li').should('have.length', 7, 'be.visible', 'have.attr', 'href')
    })
});
//I click on the footer menu items
Then(/^I should be redirected to each corresponding page$/, () => {
    cy.get('.footer').scrollIntoView()
    cy.get('nav > a[href*="/faq"]').contains('FAQs').should('exist').click()
    cy.location('pathname').should('include', '/faq')
    cy.get('.col-12').find('h1').contains('Frequently Asked Questions')
    cy.go('back')
    //
    cy.get('.order-3 > .footer-links > :nth-child(1) > a').should('exist').click({ force: true })
    cy.location('pathname').should('include', '/sign-in')
    cy.get('.mb-4 > .mb-3').contains('Sign in to STEP').should('exist')
    cy.go('back')
    //footer create account
    cy.get('.order-3 > .footer-links > :nth-child(2) > a').should('exist').contains('Create account').click({ force: true })
    cy.location('pathname').should('include', '/sign-up')
    cy.get('.row > :nth-child(1) > .mb-3').contains('Sign up to STEP').should('exist')
    cy.go('back')
    //Contact us
    cy.get('.footer-links > :nth-child(3) > a').contains('Contact us').click({ force: true })
    cy.wait(1000)
    cy.location('pathname').should('eq', '/contact')
    //cy.get('.contactus').contains('Contact Us').should('exist')
    cy.go('back')
    //Privacy policy
    cy.get(':nth-child(4) > a').contains('Privacy Policy').click({ force: true })
    cy.wait(1000)
    cy.location('pathname').should('eq', '/privacy-policy')
    cy.get('.anim-load1').contains('Privacy Policy').should('exist')
    cy.go('back')
    //Terms of use 
    cy.get(':nth-child(5) > a').contains('Terms of Use').click({ force: true })
    cy.wait(1000)
    cy.location('pathname').should('eq', '/terms-of-use')
    cy.get('.anim-load1').contains('STEP application terms and conditions').should('exist')
    cy.go('back')
    //about AdoptionPlus
    cy.get('.order-4 > .footer-links > :nth-child(2) > a').contains('About Adoptionplus').click({ force: true })
    cy.wait(2000)
    cy.location('pathname').should('eq', 'https://www.adoptionplus.co.uk/')
    cy.get('.navbar-brand').should('exist')
    cy.go('back')

});
// navigate to the FAQs screen and I see all Frequently Asked Questions
When(/^I click each FAQ accordion then each Frequently Asked Questions should pop up open$/, () => {

    cy.get('nav > a[href*="/faq"]').should('exist').click()
    cy.location('pathname').should('include', '/faq')
    cy.get('.col-12').find('h1').contains(' Frequently Asked Questions ')
    cy.get('div >.accordion').should('have.length', 10)
    cy.get('.accordion-title').then(($accordions) => {
        $accordions.each((index, accordion) => {
            cy.wrap(accordion).click({ force: true });
            cy.get(`#collapse-${index} > :nth-child(${index + 1})`).should('be.visible');
            cy.get(`:nth-child(${index + 1}) > .accordion-title > .icon-up-open`).click({ force: true });
            cy.get(`#collapse-${index} > :nth-child(${index + 1})`).should('exist');
        });
    }); 
    // cy.get(':nth-child(1) > .accordion-title').click({force:true})
    // cy.get('#collapse-0 > :nth-child(1)').should('be.visible')
    // cy.get(':nth-child(1) > .accordion-title > .icon-up-open').click({force:true})
    // cy.get('#collapse-0 > :nth-child(1)').should('not.be.visible')

    // cy.get(':nth-child(2) > .accordion-title').click({force:true})
    // cy.get('#collapse-1 > :nth-child(2)').should('be.visible')
    // cy.get(':nth-child(2) > .accordion-title > .icon-up-open').click({force:true})
    // cy.get('#collapse-1 > :nth-child(2)').should('not.be.visible')

    // cy.get(':nth-child(3) > .accordion-title').click({force:true})
    // cy.get('#collapse-2 > img').should('exist')
    // cy.get(':nth-child(3) > .accordion-title > .icon-up-open').click({force:true})
    // cy.get('#collapse-2 > :nth-child(3)').should('not.exist')    

    // cy.get(':nth-child(4) > .accordion-title').click({force:true})
    // cy.get('#collapse-3 > :nth-child(2)').should('be.visible')
    // cy.get(':nth-child(4) > .accordion-title > .icon-up-open').click({force:true})
    // cy.get('#collapse-4 > :nth-child(2)').should('not.be.visible')
});

