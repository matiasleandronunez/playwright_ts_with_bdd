@api_failure_feature
Feature: API Failures

  @api_failure_products_result @APF-001
  Scenario: [APF-001] Search API outage during search
    Given I go to the landing page
    When I search for any product with the product API unavailable
    Then I see no filtering has occurred
