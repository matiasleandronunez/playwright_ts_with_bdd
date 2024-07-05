Feature: Authenticate API

  Scenario: Check title
    Given I sign into the site through the API with a valid user
    Then I get a valid authorization token