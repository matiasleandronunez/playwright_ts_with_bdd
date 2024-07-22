@product_api_feature
Feature: Product API

  @get_valid_product_by_brand @PRO-001 @user
  Scenario: [PRO-001] User can get product by brand
    Given I request a product to the Product API querying by brand
    Then I find the requested product within the Product API response

  @get_valid_product_by_category @PRO-002 @user
  Scenario: [PRO-002] User can get product by category
    Given I request a product to the Product API querying by category
    Then I find the requested product within the Product API response