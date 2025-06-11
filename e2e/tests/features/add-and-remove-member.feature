Feature: I can add and remove a group member

  @add-group-member
  Scenario: Add new member to group
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    When I click on the text "manage users cucumber"
    Then I should see "Aggiungi utente"
    When I click on the button "Aggiungi utente"
    And I check the checkbox for user "Mario Bianchi 1@1.com"
    And I click outside the dropdown to close it
    Then I should see "Conferma"
    When I click on the button "Conferma"
    Then I should see "Gruppo modificato correttamente"

  @remove-group-member
  Scenario: Remove a group member
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    When I click on the row "manage users cucumber"
    Then I should see "Modifica"
    When I click on the button "Modifica"
    And I click on the the select "Seleziona gli utenti che vuoi"
    Then I should see "Mario Bianchi"
    When I check the checkbox for user "Mario Bianchi 1@1.com"
    And I click outside the dropdown to close it
    Then I should see "Conferma"
    When I click on the button "Conferma"
    Then I should see "Gruppo modificato correttamente"
