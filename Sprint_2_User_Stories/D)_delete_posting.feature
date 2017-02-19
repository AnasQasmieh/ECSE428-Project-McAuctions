Feature :  Delete posting

As a Seller 
I want to be able to delete my posting as I please
so that other buyers don't message me about unavailable items


Scenario :  A Seller deletes his item

		Given I am logged in as seller_for_life
		  And I have at least one posting 
		  And I am on the "My sales" page
		 When I choose one of my postings
		 Then I should be able to delete that posting

Scenario :  A Seller's item has already been sold and he deletes it

		Given I am logged in as seller_for_life
		  And I have at least one posting 
		 When I choose one of my postings that has already been sold 
		 Then I should be able to delete that posting

Scenario :  A Seller tries to delete his item but fails since he is offline

		Given I am logged in as seller_for_life
		  And I have at least one posting 
		  And I am on the "My sales" page
		  And I am disconnected from the internet
		 When I try to delet one of the postings
		 Then the attempt fails since I am offline