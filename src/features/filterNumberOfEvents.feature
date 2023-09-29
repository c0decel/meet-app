Feature: Filter number of events
    Scenario: Display 32 events by default
        Given the user hasn't specified an amount of events to display
        When they choose to display all cities and events
        Then it will show 32 by default

    Scenario: User only wants to see a specific number of events
        Given the user wants to see a specific number of events
        When they change the number of events to display
        Then the number of events will update to the number the user inputted