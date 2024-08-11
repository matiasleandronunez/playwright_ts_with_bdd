@accessibility_feature
Feature: A11Y WCAG2A & WCAG2AA compliance

  @a11y_home @ACC-001
  Scenario: [ACC-001] Check accessibility violations in landing page
    Given I go to the landing page
    Then the displayed content has no moderate or worse accessibility issues
