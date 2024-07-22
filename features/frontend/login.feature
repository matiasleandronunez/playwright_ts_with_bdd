@login_feature
Feature: Login

  @User_login_wrong_password @LOG-002
  Scenario: [LOG-002] User cant sign in with a wrong password
    Given I go to the landing page
    When I click on the sign in button in the menu
    And I sign in with a wrong password
    Then I see a login error message displayed
