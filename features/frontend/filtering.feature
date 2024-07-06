Feature: Filtering

  Scenario Outline: Sign in with valid user
    Given I go to the landing page as a logged user
    When I search product <product> by its name
    Then I see the product <product> is displayed within the search results

    Examples:
      |product    |
      |Pliers     |
      |Claw Hammer|