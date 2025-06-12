Feature: I can add and remove a group member

  @duplicate-group
  Scenario: Dupplicate a group
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    Then I should see "duplicate test cucumber"
    When I click on the row "duplicate test cucumber"
    Then I should see "Duplica"
    When I click on the button "Duplica"
    Then I should see "Duplica gruppo"
    When I click on the button "Duplica"
    When I click on the button "Conferma"
    Then I should see "Gruppo duplicato correttamente"

  @delete-group-duplicated
  Scenario: As an admin i can delete a group
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    When I click on the row "Copia di duplicate test cucumber"
    Then I should see "Elimina"
    When I click on the button "Elimina"
    Then I should see "Vuoi eliminare il gruppo Copia di duplicate test cucumber di IO?"
    When I click on the button "Elimina"
    Then I should see "Gruppo eliminato correttamente"
