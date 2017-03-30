Feature: Send a message

As a Member
I want to be able to send a message
So that I can communicate with other members concerning sales

Scenario: A member sends a message

	Given I logged into the website as mynameispablo
   	 And I am on the home page
	 When I select the send a message button
	 Then I should be able to type a message and send an email to another member.
     
Scenario: A member sends a message but fails since they have not set up their default mailing program
	Given I logged into the website as mynameispablo
   	And I am on the home page
	 When I select the send a message button
	 Then The attempt should fail.