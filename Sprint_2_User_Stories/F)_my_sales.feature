Feature : Have a "My Sales" page

As a Seller 
I want to be able to see my postings
so that I can edit them when I want to

Scenario :  Seller checks their postings via the "My Sales"
	
	Given I am logged in as seller_for_life
	  And I have at least one posting 
	 When I click on "My Sales"
	 Then I should be redirected to the "My Sales" page
	  And I should be able to see all of my postings