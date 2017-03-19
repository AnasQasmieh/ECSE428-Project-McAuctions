Feature: Have a Terms of Service Section

As a User
I want to be able to read the term of service
So that I can agree to the rules to use the service

Scenario: A user reads the terms of service

	Given I am on the home page
	 When I select Terms of Service button
	 Then I should be able to read the terms of service.
     
Scenario: A user reads the terms of service but fails since they are offline

	Given I am on the home page
     And I am offline
	 When I select Terms of Service button
	 Then The attemps the fail.