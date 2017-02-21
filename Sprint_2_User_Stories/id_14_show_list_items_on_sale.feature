Feature: Show list of my items on sale 
As a Seller
I want to be able to see the list of my items that are on sale
So I can be able to view them all at once and manage them. 

  Scenario: Seller sees the list of their items on sale
    Given I am logged into the website as ilovechickenwings
    And I want to see all my items on sale
   	When I press the my sales button
    Then I will be able to view all my sales.  
    
  Scenario: Seller sees the list of their items on sale but fails since they're offline 
    Given I am logged into the website as ilovechickenwings
    And I want to see all my items on sale
    And I get disconnected from the internet
   	When I press the my sales button
    Then the attempt fails.  
