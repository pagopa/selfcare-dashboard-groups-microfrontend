Feature: I can add and remove a group member

  Background: User is logged in and navigates to groups sect
    Given I am logged in with username "p.rossi" and password "test"
    And I navigate to "https://dev.selfcare.pagopa.it/dashboard"
    When I click on the text "Agenzia delle Dogane e dei Monopoli"
    And I click on the button "Accedi"
    When I click on the button "Gruppi"

  @add-group-member
  Scenario: Add new member to group
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
