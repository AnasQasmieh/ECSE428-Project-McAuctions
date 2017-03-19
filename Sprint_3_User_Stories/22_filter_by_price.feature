Feature: Filter Items By Category

As a User
I want to be able to search items by price
So that I can find items I am looking for more easily

Scenario: A user filters items by price

	Given I am on the home page
	 When I select a price in the top bar
	 Then The postings I see should be limited to that price.
     
Scenario: A user filters items by price but fails since they are offline

	Given I am on the home page
     And I get disconnected from the Internet
	 When I select a price in the top bar
	 Then The attempt should fail.