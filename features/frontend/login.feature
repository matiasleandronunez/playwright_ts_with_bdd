@login_feature
Feature: Login

  @User_login_valid_user @log001
  Scenario: [LOG-001] User can sign in with valid user
    Given I go to the landing page
    When I click on the sign in button in the menu
    And I sign in with a valid user
    Then I see the user dashboard displayed
