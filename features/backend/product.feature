@product_api_feature
Feature: Product API

  @get_valid_product_by_brand @PRO-001
  Scenario: [PRO-001] User can get product by brand
    Given I request a product to the Product API querying by brand
    Then I find the requested product within the Product API response

  @get_valid_product_by_category @PRO-002
  Scenario: [PRO-002] User can get product by category
    Given I request a product to the Product API querying by category
    Then I find the requested product within the Product API response

  @get_valid_product_by_id @PRO-003
  Scenario: [PRO-003] User can get product by id
    Given I request a product to the Product API querying by product id
    Then I find the requested product within the Product API response

  @get_invalid_product_by_id @PRO-004
  Scenario: [PRO-004] User gets an appropriate error when getting non existing product by id
    Given I request a product to the Product API querying with a non existing product id
    Then I get an item not found response from the Product API response