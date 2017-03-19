Feature: Purchase an item with a fixed price by clicking on the purchase fixed price button

As a Buyer
I want to click on the purchase button of an item on sale with a fixed price
So that I can buy the item

Scenario: A buyer clicks on the purchase button of an item with a fixed price

	Given I logged into the website as mcgillbuyer
   	 And I found an item that I am interested in
     And The item has a fixed price
	 When I click on the purchase button
	 Then I should to place an order on the item and buy it.
     
Scenario: A buyer clicks on the purchase button of an item with a fixed price but fails since they are offline

	Given I logged into the website as mcgillbuyer
   	 And I found an item that I am interested in
     And The item has a fixed price
     And I get disconnected from the internet
	 When I click on the purchase button
	 Then The attempt shoud fail