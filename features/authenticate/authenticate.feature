Feature: Authenticate API

  Scenario: User can authenticate through the API
    Given I sign into the site through the API with a valid user
    Then I get a valid authorization token