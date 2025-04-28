Feature: I can add and remove a group member

  Background: User is logged in and navigates to groups sect
    Given I am logged in with username "p.rossi" and password "test"
    And I navigate to "https://dev.selfcare.pagopa.it/dashboard"
    When I click on the text "Agenzia delle Dogane e dei Monopoli"
    And I click on the button "Accedi"
    When I click on the button "Gruppi"

  @duplicate-group
  Scenario: Dupplicate a group
    When I click on the button "Gruppi"
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
    When I click on the row "Copia di duplicate test cucumber"
    Then I should see "Elimina"
    When I click on the button "Elimina"
    Then I should see "Vuoi eliminare il gruppo Copia di duplicate test cucumber di IO?"
    When I click on the button "Elimina"
    Then I should see "Gruppo eliminato correttamente"
