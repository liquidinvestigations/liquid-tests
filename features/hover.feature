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
    And I click Add link in Groups section
    And I type testgroup in Name field
    And I click Save submit button
    Then I can see testgroup on the list

  Scenario: Admin delete a group
    When I click admin MUI navigation button
    And I click Change link in Groups section
    And I click testgroup on the list
    And I click Delete link
    And I click Yes, I’m sure submit button
    Then I can not see testgroup on the list

  Scenario: Search for documents containing word "testing test"
    When I click Collections category
    And I click testdata bucket
    And I type testing test in Search box
    And I click Search MUI button
    Then I should see 7 results

  Scenario: Refine search link leads to correct website
    When I click this handy guide link
    Then I should visit https://github.com/liquidinvestigations/hoover-search/wiki/Guide-to-search-terms URL

  Scenario: Change results order
    When I click Collections category
    And I click testdata bucket
    And I type testing test in Search box
    And I click Search MUI button
    Then I should see PublicWaterMassMailing.pdf result on 6th position
    When I click sort button
    And I click Size menu item
    Then I shoud see Size chip next to sort button
    And I should see PublicWaterMassMailing.pdf result on 1st position

  Scenario: Search for 2015 year PDFs containing word "test"
    When I click Collections category
    And I click testdata bucket
    And I click File Types category
    And I click File type filter
    And I click pdf bucket
    Then I should see pdf chip under Filters
    When I type test in Search box
    And I click Search MUI button
    Then I should see 2 results
    When I click Dates category
    And I click 2015 bucket
    Then I should see 2015 chip under Filters
    And I should see 1 result
    When I click File Sizes category
    And I click 1 MB - 500 MB bucket
    Then I should see 1 MB - 500 MB chip under Filters
    And I should see 1 result

  Scenario: Filter reset button
    When I click Collections category
    And I click testdata bucket
    And I click File Sizes category
    And I click 1 MB - 500 MB bucket
    Then I should see 1 MB - 500 MB chip under Filters
    When I click Reset MUI button
    Then I should not see 1 MB - 500 MB chip under Filters

  Scenario: Change the number of results per page
    When I click Collections category
    And I click testdata bucket
    And I type * in Search box
    And I click Search MUI button
    Then I should see 10 results
    When I click Hits / page select
    And I click 50 menu item
    Then I should see 50 results

  Scenario: Change results page
    When I click Collections category
    And I click testdata bucket
    And I type * in Search box
    And I click Search MUI button
    Then I should see usr-share-dict-words.txt result on 1st position
    When I click next page button
    Then I should see page-025-112.png result on 1st position
    When I click prev page button
    Then I should see usr-share-dict-words.txt result on 1st position

  Scenario: Open result preview
    When I click Collections category
    And I click testdata bucket
    And I type test in Search box
    And I click Search MUI button
    And I click 1st result
    Then I should see 1st result to be highlighted
    And I should document in the preview

  Scenario: Download document from results list
    When I click Collections category
    And I click testdata bucket
    And I type test in Search box
    And I click Search MUI button
    And I click Download original file button on 1st result
    Then I should see 1st result file downloaded

  Scenario: Open document in new tab from preview
    When I click Collections category
    And I click testdata bucket
    And I type test in Search box
    And I click Search MUI button
    And I click 1st result
    And I click Open in new tab button on preview
    Then I should see a new tab open

  Scenario: Download document from preview
    When I click Collections category
    And I click testdata bucket
    And I type test in Search box
    And I click Search MUI button
    And I click 1st result
    And I click Download original file button on preview
    Then I should see 1st result file downloaded

  Scenario: Print document from preview
    When I click Collections category
    And I click testdata bucket
    And I type test in Search box
    And I click Search MUI button
    And I click 1st result
    And I click Print metadata and content button on preview
    Then I should see a new tab open

  Scenario: Press J hotkey to move to next result
    When I click Collections category
    And I click testdata bucket
    And I type test in Search box
    And I click Search MUI button
    And I click 1st result
    Then I should see 1st result to be highlighted
    When I press J hotkey
    Then I should see 2nd result to be highlighted

  Scenario: Press K hotkey to move to previous result
    When I click Collections category
    And I click testdata bucket
    And I type test in Search box
    And I click Search MUI button
    And I click 2nd result
    Then I should see 2st result to be highlighted
    When I press K hotkey
    Then I should see 1st result to be highlighted

  Scenario: Press O hotkey to open document in new tab
    When I click Collections category
    And I click testdata bucket
    And I type test in Search box
    And I click Search MUI button
    And I click 1st result
    Then I should see 1st result to be highlighted
    When I press O navigation hotkey
    Then I should see a new tab open

  Scenario: Batch search
    When I click Batch search link
    And I type testing\ntest in Batch search box
    And I click Batch search MUI button
    Then I should see 2 results