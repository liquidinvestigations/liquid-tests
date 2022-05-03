Feature: Liquid home

  Background:
    Given I am logged in as administrator

  Scenario: Create a group
    When I click [admin] link
    When I click Add link in Groups section
    When I type testgroup in Name field
    When I click Save submit button
    Then I can see testgroup on the list

  Scenario: Delete a group
    When I click [admin] link
    When I click Change link in Groups section
    When I click testgroup on the list
    When I click Delete link
    When I click Yes, I’m sure submit button
    Then I can not see testgroup on the list

  Scenario: Create a user
    When I click [admin] link
    When I click Add link in Users section
    When I type testuser in Username field
    When I type testpass in Password field
    When I type testpass in Password confirmation field
    When I click Save submit button
    When I click Can use hoover label
    When I click Save submit button
    Then I can see testuser on the list

Scenario: Create a second user and log into hoover
    When I click [admin] link
    When I click Add link in Users section
    When I type testuser2 in Username field
    When I type testpass2 in Password field
    When I type testpass2 in Password confirmation field
    When I click Save submit button
    When I click Can use hoover label
    When I click Save submit button
    Then I can see testuser2 on the list
    When I click Log out link
    When I login as testuser with password testpass
    When I click Hoover link
    Then I should be logged in as testuser
    When I click Liquid Test Org link
    When I click [logout] link
    When I login as testuser2 with password testpass2
    When I click Hoover link 
    Then I should be logged in as testuser2

  Scenario: Delete a user
    When I click [admin] link
    When I click Change link in Users section
    When I click testuser on the list
    When I click Delete link
    When I click Yes, I’m sure submit button
    Then I can not see testuser on the list

  Scenario: Delete second user
    When I click [admin] link
    When I click Change link in Users section
    When I click testuser2 on the list
    When I click Delete link
    When I click Yes, I’m sure submit button
    Then I can not see testuser2 on the list