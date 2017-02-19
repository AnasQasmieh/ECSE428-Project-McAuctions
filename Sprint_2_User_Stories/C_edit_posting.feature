Feauture : Edit Posting

As a Seller
I want to be able to edit my posting information
So that I can keep the information of the posting up to date

Scenario: A member edits his posting's title and succeeds

	Given I am logged into the website as coffeeeee
	  And I am on the "My Sales" page
	  And I have atleast one posting
	 When I select "Edit Title" on a posting
	  And I type in the psoting's new title
	  And I confirm the change title request
	 Then I should see that the posting's title has chaged

Scenario: A member tries editing his posting's title but fails since they are offline 

	Given I am logged into the website as coffeeeee
	  And I am on the "My Sales" page
	  And I have atleast one posting
	  And I get diconnected from the internet
	  And I select "Edit Title" on a posting
	  And I type in the psoting's new title
	 When I try to confirm the change title request
	 Then the attempt should fail since I am offline

Scenario: A member edits his posting's price and succeeds

	Given I am logged into the website as coffeeeee
	  And I am on the "My Sales" page
	  And I have atleast one posting
	 When I select "Edit price" on a posting
	  And I type in the psoting's new price
	  And I confirm the change price request
	 Then I should see that the posting's price has chaged

Scenario: A member tries editing his posting's price but fails since they are offline 

	Given I am logged into the website as coffeeeee
	  And I am on the "My Sales" page
	  And I have atleast one posting
	  And I get diconnected from the internet
	  And I select "Edit price" on a posting
	  And I type in the psoting's new price
	 When I try to confirm the change price request
	 Then the attempt should fail since I am offline

Scenario: A member edits his posting's description and succeeds

	Given I am logged into the website as coffeeeee
	  And I am on the "My Sales" page
	  And I have atleast one posting
	 When I select "Edit description" on a posting
	  And I type in the psoting's new description
	  And I confirm the change description request
	 Then I should see that the posting's description has chaged

Scenario: A member tries editing his posting's description but fails since they are offline 

	Given I am logged into the website as coffeeeee
	  And I am on the "My Sales" page
	  And I have atleast one posting
	  And I get diconnected from the internet
	  And I select "Edit description" on a posting
	  And I type in the psoting's new description
	 When I try to confirm the change description request
	 Then the attempt should fail since I am offline