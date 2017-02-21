Feature: Place a bid on an item 
As a Buyer
I want to be able to place a bid on an item
So I can be able to participate in the bidding and possibly purchase the item

  Scenario: Buyer places a bid greater than the most recent bid on an item they are interested in
    Given I am logged into the website as ihatemondays
    And I found an item that involves a bidding system
    And I type in the amount in Canadian dollars 
    And The amount I typed in is greater than the latest amount in the bidding system
   	When I press the make offer button
    Then I will be able to see my bid on the item. 


  Scenario: Buyer places bid smaller than the most recent bid on an item they are interested in
    Given I am logged into the website as ihatemondays
    And I found an item that involves a bidding system
    And I type in the amount in Canadian dollars 
    And The amount I typed in is smaller than the latest amount in the bidding system
   	When I press the make offer button
    Then The website will display an error message saying that I should increase my bidding amount.
  
  Scenario: Buyer places a bid greater than the most recent bid on an item they are interested in but fails since they are offline
    Given I am logged into the website as ihatemondays
    And I found an item that involves a bidding system
    And I type in the amount in Canadian dollars 
    And The amount I typed in is greater than the latest amount in the bidding system
    And I get disconnected from the internet
   	When I press the make offer button
    Then The attempt will fail. 