Feature: Show List of People who clicked Purchase

As a Seller
I want to see a list of people that clicked purchase on my item
So that I know who wants to buy my item

Scenario: List of people visible for every item

	Given I logged into the website as mynameispablo
   	 When I am on My Sales page
	 Then I can see who tried purchasing every item in the list
	 Then I should be able to type a message and send it to another member.