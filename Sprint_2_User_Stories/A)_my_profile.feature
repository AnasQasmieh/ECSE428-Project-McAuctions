Feature : Have a "My Profile"

As a Member
I want to be able to access my account information
So that I can see and/or edit them

Scenario: A Member accesses his account information page

	Given I am logged into the website as coffeeeee
	  And I am on the home page
	 When I select "My Profile"
	 Then I should be redirected to the "My Profile" page
	  And I should be able to access all my account information


Scenario: A member tries accessing his "My Profile" page but fails since they are offline 

	Given I am logged into the website as coffeeeee
	  And I am on the home page
	 When I select "My Profile"
	 Then I should recieve a error message specifying that I am logged off