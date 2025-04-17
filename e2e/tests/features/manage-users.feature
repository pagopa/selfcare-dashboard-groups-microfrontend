Feature: Manage members as an administrator

  Background: User is logged in and navigates to groups sect
    Given I am logged in with username "p.rossi" and password "test"
    When I navigate to "https://dev.selfcare.pagopa.it/dashboard"
    When I click on "Agenzia delle Dogane e dei Monopoli"
    And I click on "Accedi"
    When I click on "Gruppi"
