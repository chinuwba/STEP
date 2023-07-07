class PageObject {

    STEPlOGO() 
    {  
        return cy.get('.nav-logo > img').should('exist') 
    }
    
    SignInlink() 
    { 
        return cy.get('nav > [href="/sign-in"]').contains('Sign in')
    }
    CreateAccountLink()
    {
        return cy.get('nav > [href="/sign-up"]').contains('Create account')
    }

    Create_AccountEmail()
    { 
        return  cy.get(':nth-child(1) > span > .form-control')
    }
    Create_AccountPass() {
       return cy.get(':nth-child(2) > span > .form-control')
    }
    Create_AccountConPass() {
        return cy.get('.pb-3 > span > .form-control')
    }
    SignUpButton() 
    {  
      return  cy.get('.btn').contains('Sign up')
    }

    Login_Email() 
    {
     return  cy.get(':nth-child(1) > span > .form-control')
    }
    Login_Password() 
    {
     return   cy.get(':nth-child(2) > span > .form-control')
    }
    SignInButton() 
    {
     return  cy.get('.mb-3 > .btn')
    }
    ForgotPassword() 
    {
      return  cy.get('.text-center > .btn').contains('Forgot your password?')
    }

    ResetpasswordButton()
    {
        return cy.get('.mb-3 > .btn').contains('Reset password')
    }

    ResetEmailField() {
        return cy.get('.form-control')
    }
    LoginVerfiyCode(){
        return cy.get('input[name="verificationCode"]').should('have.attr','placeholder')
    }
    VerfiyCodeField() {
        return cy.get('input[autocomplete="one-time-code"]');
    }
}

export default new PageObject();