Feature: Update group status

  @suspend-group
  Scenario: Suspend a group
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    Then I should see "suspend group cucumber"
    When I click on the text "suspend group cucumber"
    Then I should see "Sospendi"
    When I click on the button "Sospendi"
    Then I should see "Sospendi gruppo"
    When I click on the button "Sospendi"
    Then I should see "Gruppo sospeso correttamente"

  @enable-group
  Scenario: Enable a suspended group
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    When I click on the text "suspend group cucumber"
    Given I should see "Riattiva"
    When I click on the button "Riattiva"
    Then I should see "Riattiva gruppo"
    When I click on the button "Riattiva"
    Then I should see "Gruppo riattivato correttamente"
