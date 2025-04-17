Feature: Manage groups as an administrator

  Background: User is logged in and navigates to groups sect
    Given I am logged in with username "p.rossi" and password "test"
    When I navigate to "https://dev.selfcare.pagopa.it/dashboard"
    When I click on "Agenzia delle Dogane e dei Monopoli"
    And I click on "Accedi"
    When I click on "Gruppi"

  @create-group
  Scenario: As an admin i can create a group
    When I click on "Crea Gruppo"
    When I create a group with name "Create group test cucumber", description "Cucumber description", and user "Cesidia Mancini 1@1.co"
    Then I should see "Gruppo creato correttamente"

  @delete-group
  Scenario: As an admin i can delete a group
    When I click on "Create group test cucumber"
    Then I should see "Elimina"
    When I click on "Elimina"
    Then I should see "Vuoi eliminare il gruppo Create group test cucumber di IO?"
    When I click on "Elimina"
    Then I should see "Gruppo eliminato correttamente"

  @suspend-group
  Scenario: As an admin i can suspend a group
    When I click on "Gruppi"
    Then I should see "suspend group cucumber"
    When I click on "suspend group cucumber"
    Then I should see "Sospendi"
    When I click on "Sospendi"
    Then I should see "Sospendi gruppo"
    When I click on "Sospendi"
    Then I should see "Gruppo sospeso correttamente"

  @reactivate-group
  Scenario: As an admin i can reactivate a suspended group
    When I click on "suspend group cucumber"
    Given I should see "Riattiva"
    When I click on "Riattiva"
    Then I should see "Riattiva gruppo"
    When I click on "Riattiva"
    Then I should see "Gruppo riattivato correttamente"

  @edit-group
  Scenario: As an admin i can edit a user group
    When I modify the group description with "prima modifica"
    Then I should see "Gruppo modificato correttamente"
