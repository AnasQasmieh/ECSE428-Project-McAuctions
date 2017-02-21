Feature: Show history of my items sold
As a Seller
I want to be able to see the history of the items I have sold
So I can be able to keep track of my sales. 

  Scenario: Seller views the history of their items that have been sold
    Given I am logged into the website as helloitsme
    And I want to see all the items I have sold
   	When I press the my sale history button
    Then I will be able to view all the items I have sold.  
    

  Scenario: Seller views the history of their items that have been sold but fails since they are offline
    Given I am logged into the website as helloitsme
    And I want to see all the items I have sold
    And I get disconnected from the internet
   	When I press the my sale history button
    Then the attempt will fail.  
