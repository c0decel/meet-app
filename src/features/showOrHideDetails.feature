Feature: Show or hide details
    Scenario: the events are all collapsed by default
        Given the user searches for events
        When the user recieves the list of events
        Then they will collapse by default

    Scenario: user wants more details about an upcoming event
        Given the user wants to see more about an event
        When the user clicks the "show details" button
        Then the user can see the details of the event
        
    Scenario: user doesnt care about that anymore
        Given the user wants to close the details
        When the user clicks "hide details"
        Then the details of that event will collapse