Feature: Hoover

  Background:
    Given I am logged in as administrator
    And I click Hoover link

  Scenario: About link leads to correct website
    When I click about MUI navigation button
    Then I should visit https://github.com/liquidinvestigations/hoover-search URL

  Scenario: Documentation link leads to correct website
    When I click documentation MUI navigation button
    Then I should visit https://github.com/liquidinvestigations/docs/wiki URL

  Scenario: Admin create a group
    When I click admin MUI navigation button
    When I click Add link in Groups section
    When I type testgroup in Name field
    When I click Save submit button
    Then I can see testgroup on the list

  Scenario: Admin delete a group
    When I click admin MUI navigation button
    When I click Change link in Groups section
    When I click testgroup on the list
    When I click Delete link
    When I click Yes, I’m sure submit button
    Then I can not see testgroup on the list

  Scenario: Search for documents containing word "testing test"
    When I click Collections category
    When I click testdata bucket
    When I type testing test in search box
    When I click Search MUI ajax button
    Then I should see 7 results

  Scenario: Refine search link leads to correct website
    When I click this handy guide link
    Then I should visit https://github.com/liquidinvestigations/hoover-search/wiki/Guide-to-search-terms URL

  Scenario: Change results order
    When I click Collections category
    When I click testdata bucket
    When I type testing test in search box
    When I click Search MUI ajax button
    Then I should see PublicWaterMassMailing.pdf result on 6th position
    When I click sort button
    When I click Size menu item
    Then I shoud see Size chip next to sort button
    Then I should see PublicWaterMassMailing.pdf result on 1st position

  Scenario: Search for 2015 year PDFs containing word "test"
    When I click Collections category
    When I click testdata bucket
    When I click File Types category
    When I click File type filter
    When I click pdf bucket
    Then I should see pdf chip under Filters
    When I type test in search box
    When I click Search MUI ajax button
    Then I should see 2 results
    When I click Dates category
    When I click 2015 bucket
    Then I should see 2015 chip under Filters
    Then I should see 1 results
    When I click File Sizes category
    When I click 1 MB - 500 MB bucket
    Then I should see 1 MB - 500 MB chip under Filters
    Then I should see 1 results
