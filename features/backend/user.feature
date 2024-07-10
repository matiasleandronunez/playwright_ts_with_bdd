@user_api_feature
Feature: User API

  @user_valid_api_auth @aut001
  Scenario: [AUT-001] User can authenticate through the API
    Given I sign into the site through the API with a valid user
    Then I get a valid authorization token