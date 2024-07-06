Feature: Filtering

  Scenario Outline: User can filter products by name
    Given I go to the landing page as a logged user
    When I search product <product> by its name
    Then I see the product <product> is displayed within the search results

    Examples:
      |product    |
      |Pliers     |
      |Claw Hammer|

  Scenario Outline: User can filter products by price range
    Given I go to the landing page as a logged user
    When I filter by the price range around <price>
    Then I see the product <product> is displayed within the search results

    Examples:
      |product          |price|
      |Slip Joint Pliers|9.17 |
      |Circular Saw     |80.19|