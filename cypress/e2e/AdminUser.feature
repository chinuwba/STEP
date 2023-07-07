Feature: STEP Admin parent User automation

    STEP Admin parent User automation
        # using this profile fresh ==christian+kosi@greenwoodcampbell.com only parent user
        # christian+nonso@greenwoodcampbell.com = admin parent user
        # christian+ugo@greenwoodcampbell.com = parent user
        # christian+namo@greenwoodcampbell.com = parent user
        # #########
        # christian+ide@greenwoodcampbell.com = admin parent user
        # christian+ide1@greenwoodcampbell.com =  parent user
        # christian+ide2@greenwoodcampbell.com =  parent user
        # #########
        # christian+kwasi1@greenwoodcampbell.com = admin parent user
        # christian+kwasi2@greenwoodcampbell.com =  parent user
        # christian+kwasi3@greenwoodcampbell.com =  parent user

    Background: I navigate to the home site
        Then I should be on STEP login page

    # Scenario: I create an Admin Parent User Profile
    #     When I'm on STEP home page and I click the create account menu link
    #     Then The sign up to STEP page will display
    #     When I enter my email on the Email address field
    #     And I enter create password and confirm password
    #     And I accept the Terms and Conditions
    #     When I click the sign up button
    #     Then The system should display Thank you for signing up to STEP.Please visit your inbox to verify your email message.
    #     When I click on the verify email now button in my inbox
    #     Then I should be redirected to the email confirmed 2-step verification with your phone screen
    #     And I enter my phone number and click submit button
    #     Then The system should send a 6-digit verification code to my phone number
    #    And The verify your number screen will display
    #     When I enter the verification code and click verify button
    #     Then I should be redirected to the admin parent user Dashboard.

    Scenario: Admin Parent User Forgot Password Reset
        When I click the Sign in link and navigate to the sign in page.
        Then I'm on the sign in to STEP screen will display and i click the Forgot your password link
        Then Reset your password screen will display
        And I enter Your email and click Reset password button
        Then The system will display a message "If your account exists, a password reset email is on its way to you"
#         # And I verify the reset password link is sent to the email and I click on the reset password link
#         # And I enter the current password and new password and confirm password
#         # When I Click reset password button.
#         # Then The system should reset my password

# Scenario: Admin Parent User login
#     Use this Uk number 07868135628
#     When I navigate to the STEP home page and I click the Sign in link
#     Then I should see the Sign in to Step and i enter admin user email and password
#     And I click the sign in button, the system will send a verification code to the registered phone number
#     When I enter the verification code and click Verify and sign in button
#     Then I should be on the admin parent user Dashboard and I should see family profile, TAYC-R and Your report Information Card.

#     Scenario: Admin User complete the TAYC-R questionnaire and sets up the profile
#         #christian+kwasi1@greenwoodcampbell.com
#         #A new admin parent user to be used from creation to TAYC-R completion
#         Given I create a new Admin Parent User Profile and I on the admin parent user Dashboard
#         And I click the TAYC-R Questionnarie Let's start button
#         When Please read this carefully pop-up displays and I click I understand button
#         Then I should see a pop-up dialog and I click I understand button
#         And I see the Family and Parent proflie forms
#         When I fill all the required family forms and Click Submit
#         Then I should be on the child profile and I fill all the requires fields and Click Submit.
#         When I navigate to the TAYC-R Questionnaire screen and i fill the Questionnaire
#         And I click submit and finish button
#         Then The system should display a Thank you for completing the TAYC-R Therapeutic Questionnaire
#         And I click the view results button
#         Then I should see the family profiles and the adopted children profiles

#     Scenario: Admin Parent User invite another parent user
#         Given I login and navigate to the Admin Parent Dashboard
#         And I click the Family profiles Icon and the Family profile page opens
#         And I click Add adoptive parent button
#         Then Invite additional adoptive parent to your family profiles pop-up dialog will display
#         When I enter the additional adoptive parent email
#         And I click Send Invite button.
#         Then System will display invite sent and send Welcome to STEP! email.

#     Scenario: Parent Adds a child profile to the family
#         #christian+kosi@greenwoodcampbell.com
#         Given I login and navigate to the Admin Parent Dashboard.
#         When I click the view Family profile button and the family profile page opens
#         When I click the Add child button and the child profile open
#         And I fill all the required Child fields
#         And I click Submit and go to next step button
#         Then I should be redirected to the TAY-R Questionnarie page
#         When I all the questionnaires and I click the Submit button
#         Then I should see two buttons Add another child profile and Submit and finish button
#         And I click the Submit and finish button
#         Then The system should display Thank you for completing the TAYC-R Therapeutic Questionnaire

#     Scenario: Admin Parent User deletes a Parent User
#         #christian+kosi@greenwoodcampbell.com
#         Given I login and I click the Go to Dashboard button
#         And I'm on the Dashboard and I click the family profile icon
#         Then I navigate to the family profile page and I click a parent user Icon.
#         Then Remove this parent button will display and I click it.
#         And A confirmation pop-up box will display and I click Yes remove button
#         Then The system will display a message Parent remove and the parent record will disappear from the family profile.

#     Scenario: Admin Parent User edit a child profile
#         #christian+kosi@greenwoodcampbell.com
#         Given I login and I click the Go to Dashboard button
#         And Am on the Dashboard and I click the family profile icon
#         Then I navigate to the family profile page.
#         When I click on the Child edit profile button
#         Then The edit child profile page will open
#         And Make a change to the childs profile and click update button
#         Then The system will display a message Child update successful.

    Scenario: I navigate to the site main menu
        When I click the FAQs menu then I should be redirected to the FAQ page
        Then I click on the Create account menu link then I should be redirected to the sign up in to STEP screen
        Then I click on the Sign in menu link then I should be redirected to the sign in to STEP screen

    Scenario: I navigate to the site footer menu
        Then I should see all the "<footer menu>" list

    Scenario: I click on the footer menu items
        Then I should be redirected to each corresponding page

    Scenario: I navigate to the FAQs screen and I see all Frequently Asked Questions
        When I click each FAQ accordion then each Frequently Asked Questions should pop up open
