Feature: Search Sales Postings
As a Member
I want to be able to search sales postings 
So I can find apartment postings that is most suitable for me

  Scenario: User searches for sale postings
    Given I am on the website
    And I click on the search bar
    And I start typing my query
   	When I press the search button
    Then I will get search results related to my query. 

  
  Scenario: User tries searcing for sale postings but fails since they are offline
    Given I am on the website
    And I click on the search bar
    And I start typing my query
    And I am offline
    When I press the search button
    Then the attempt fails 