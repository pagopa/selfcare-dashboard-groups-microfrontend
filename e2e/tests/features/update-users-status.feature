Feature: Suspend and enable a group member

  @suspend-member
  Scenario: As an admin i can suspend a group members
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    When I click on the row "manage users cucumber"
    And I click on the text "Cesidia Mancini"
    Then I should see "Sospendi"
    When I click on the button "Sospendi"
    Then I should see "Sospendi ruolo"
    When I click on the button "Sospendi"
    Then I should see "Ruolo sospeso correttamente"

  @enable-member
  Scenario: As an admin i can enable the role of a suspended user
    Given I am logged in with username "p.rossi", password "test" and institution "Agenzia delle Dogane e dei Monopoli"
    When I click on the row "manage users cucumber"
    And I click on the text "Cesidia Mancini"
    Then I should see "Sospeso"
    When I click on the button "Riabilita"
    Then I should see "Riabilita Ruolo"
    When I click on the button "Riabilita"
    Then I should see "Ruolo riabilitato correttamente"
