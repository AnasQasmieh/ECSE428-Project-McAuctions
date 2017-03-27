Feature: Add Item to Watchlist

As a Buyer
I want to be able to add any posted item to my Watchlist
So that I can save it to act on it later.

Scenario: Add item to watchlist

	Given I logged into the website as mynameispablo
	  And I am on the home page
	 When I select the Add to Watchlist option on an item
	 Then The item is added to my Watchlist
	  And I can find it when I click on My Watchlist.

#Error
Scenario: Add item to Watchlist fails because user is not logged in

	Given I visit the website as a visitor
	  And I am on the home page
	  And I am not logged in 
	 When I select the Add to Watchlist option on an item
	 Then a popup is shown warning me that I need to log in for adding items to my Watchlist 
	  And I cannot find it when I click on My Watchlist.
