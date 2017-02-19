Featrue : Edit Account Information

As a Memebr
I want to be be able to edit my account information
So that I can keep my account constantly secure and upto date


Scenario: A member edits his password and succeeds

	Given I am logged into the website as coffeeeee
	  And I am on the "My Profile" page
	 When I select "Edit Password"
	  And I type in my new password
	  And I confirm the change password request
	 Then I should recieve a message confirming that my password has been changed
	  And I should be able to login to my account with my new password

Scenario: A member tries editing his password but fails since they are offline 

	Given I am logged into the website as coffeeeee
	  And I am on the "My Profile" page
	  And I get diconnected from the internet
	 When I select "Edit Password"
	  And I type in my new password
	  And I click to confirm
	 Then the attempt fails

Scenario: A member edits his email and succeeds

	Given I am logged into the website as coffeeeee
	  And I am on the "My Profile" page
	 When I select "Edit Email"
	  And I type in my new email
	  And I confirm the change email request
	 Then I should recieve a message confirming that my email has been changed
	  And I should be able to login to my account with my new email


Scenario: A member tries editing his email but fails since they are offline 

	Given I am logged into the website as coffeeeee
	  And I am on the "My Profile" page
	  And I get diconnected from the internet
	 When I select "Edit Email"
	  And I type in my new email
	  And I click to confirm
	 Then the attempt fails

Scenario: A member edits his Username and succeeds

	Given I am logged into the website as coffeeeee
	  And I am on the "My Profile" page
	 When I select "Edit Username"
	  And I type in my new username
	  And I confirm the change ussrname request
	 Then I should recieve a message confirming that my username has been changed
	  And I should be able to login to my account with my new username


Scenario: A member tries editing his username but fails since they are offline 

	Given I am logged into the website as coffeeeee
	  And I am on the "My Profile" page
	  And I get diconnected from the internet
	 When I select "Edit Username"
	  And I type in my new username
	  And I click to confirm
	 Then the attempt fails