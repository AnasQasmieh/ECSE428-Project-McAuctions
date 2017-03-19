Feature: Delete Item After Expiry

As a Seller
I want my item to be deleted after it expires
So that no more buyers can bid on the item

Scenario: Item deleted after expiry

	Given I logged into the website as mynameispablo
   	  And I have an item placed for bid
	 When The item reaches its bid expiry date
	 Then The item is deleted