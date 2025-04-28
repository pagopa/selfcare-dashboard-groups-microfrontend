Feature: Update group status

  Background: User is logged in and navigates to groups sect
    Given I am logged in with username "p.rossi" and password "test"
    When I navigate to "https://dev.selfcare.pagopa.it/dashboard"
    And I click on the text "Agenzia delle Dogane e dei Monopoli"
    And I click on the button "Accedi"
    When I click on the button "Gruppi"

  @suspend-group
  Scenario: Suspend a group
    When I click on the button "Gruppi"
    Then I should see "suspend group cucumber"
    When I click on the text "suspend group cucumber"
    Then I should see "Sospendi"
    When I click on the button "Sospendi"
    Then I should see "Sospendi gruppo"
    When I click on the button "Sospendi"
    Then I should see "Gruppo sospeso correttamente"

  @enable-group
  Scenario: Enable a suspended group
    When I click on the text "suspend group cucumber"
    Given I should see "Riattiva"
    When I click on the button "Riattiva"
    Then I should see "Riattiva gruppo"
    When I click on the button "Riattiva"
    Then I should see "Gruppo riattivato correttamente"
