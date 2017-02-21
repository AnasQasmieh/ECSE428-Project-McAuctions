Feature: View money accumulated by sales
As a Seller
I want to be able to view the amount money I have accumulated from my sales
So I can be able to keep track of my how much money I am making. 

  Scenario: Seller views the amount of money accumulated by sales
    Given I am logged into the website as helloitsmeivebeenwonderingifafteralltheseyeardsyoudliketomeet
    And I want to see how much money I have made from my sales
    And I am on the my sales page
   	When I press the money accumulatd button
    Then I will be able to view the total amount of money I accumulated from my sales.  
    
  Scenario: Seller views the amount of money accumulated by sales but fails since they are offline
    Given I am logged into the website as helloitsmeivebeenwonderingifafteralltheseyeardsyoudliketomeet
    And I want to see how much money I have made from my sales
    And I am on the my sales page
    And I get disconnected from the internet 
   	When I press the money accumulatd button
    Then The attempt will fail.  
     
