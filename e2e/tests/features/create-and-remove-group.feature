Feature: Create and remove a group

  @create-group
  Scenario: As an admin i can create a group
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    When I click on the button "Crea gruppo"
    And I create a group with name "Create group test cucumber", description "Cucumber description", and user "Cesidia Mancini 1@1.co"
    Then I should see "Gruppo creato correttamente"

  @delete-group
  Scenario: As an admin i can delete a group
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    When I click on the text "Create group test cucumber"
    Then I should see "Elimina"
    When I click on the button "Elimina"
    Then I should see "Vuoi eliminare il gruppo Create group test cucumber di IO?"
    When I click on the button "Elimina"
    Then I should see "Gruppo eliminato correttamente"
