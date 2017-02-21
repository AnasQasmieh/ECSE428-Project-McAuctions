Feature: Member deletes account

As a Member
I want to be able to delete my account
So that I don't want to use the website anymore   

  Scenario: The member deletes his account through the website
        Given I am logged in on the wesite as ilovedogs
          And I navigate to the my profile page
         When I click on the delete account button
         Then I should expect that the website will remove my account
          And Delete all my information from the server
          And the website should redirect me to the login in page

   Scenario: The user attempts to delete his account through the website and he is offline
        Given I am logged in on the website as ilovedogs
          And I navigate to the my profile page
          And I get disconnected from the internet
         When I click on the delete account button
         Then The attempt fails 