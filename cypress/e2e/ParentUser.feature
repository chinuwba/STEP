Feature: Adoption Plus Parent User test scenaior automation

    Feature Description

    Background: I navigate to the home site
        Then I should be on STEP login page

    
   Scenario: Parent user successful login
   Scenario: View a childs report
   Scenario: Add a child
   Scenario: Update a parent profile
   Scenario: Complete a childs TAYC-R Therapeutic Questionnaire.

     Scenario: Parent Adds a child profile to the family
        #christian+namo@greenwoodcampbell.com
        Given I login and navigate to the Admin Parent Dashboard.
        When I click the view Family profile button and the family profile page opens
        When I click the Add child button and the child profile open
        And I fill all the required Child fields
        And I click Submit and go to next step button
        Then I should be redirected to the TAY-R Questionnarie page
        When I all the questionnaires and I click the Submit button
        Then I should see two buttons Add another child profile and Submit and finish button
        And I click the Submit and finish button
        Then The system should display Thank you for completing the TAYC-R Therapeutic Questionnaire     