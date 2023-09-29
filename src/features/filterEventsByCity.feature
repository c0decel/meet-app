Feature: Filter events by city
    Scenario: User opens the app when no city is searched
        Given the user hasn't searched a city
        When they open the application
        Then they should see upcoming events from all cities

    Scenario: User should see a list of suggestions when they search a city
        Given the search bar is open
        When the user starts typing a search
        Then they should recieve a list of cities that match their search

    Scenario: User clicks on the city they are interested in
        Given the user searches a city
        And the list of suggested cities is showing
        When they click on a city of interest
        Then the events will filter to show events from that city
        And the user should recieve a list of events in that 
