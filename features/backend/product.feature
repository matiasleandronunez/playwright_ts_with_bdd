@product_api_feature
Feature: Product API

  @get_valid_product @pro001
  Scenario: [PRO-001] User can get product by brand
    Given I request a product to the Product API querying by brand
    Then I find the requested product within the Product API response