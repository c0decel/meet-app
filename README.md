# Meet App
## FEATURE: filter events by city

As a user, I would like to be able to filter events by city so that I can see the list of events that
take place in that city.

- Scenario: user opens the app when no city is searched
    * Given the user hasn't searched a city, when they open the application, then they should see upcoming events from all cities
- Scenario: user clicks on the city they are interested in
    * Given the user sees the suggested cities, when they click on a city of interest, then the events will filter to show events from that city
- Scenario: user selects a city
    * Given the user starts typing in a city, when the user selects a city, then they should recieve a list of upcoming events in that city
## FEATURE: show or hide event details

As a user, I would like to be able to show/hide event details so that I can see more/less
information about an event.

- Scenario: the events are all collapsed by default
  * Given the user searches for events, when the user recieves the list of events, then they will collapse by default
-  Scenario: user wants more details about an upcoming event
    * Given the user wants to see more about an event, when the user clicks the "show details" button, then the user can see the details of the event
- Scenario: user doesn't care about that anymore
    * Given the user wants to close the details, when the user clicks "hide details", then the details of that event will collapse
## FEATURE: filter number of events

As a user, I would like to be able to specify the number of events I want to view in the app so
that I can see more or fewer events in the events list at once.

- Scenario: display 10 events by default
  * Given the user hasn't specified an amount of events to display, when they choose to display all cities and events, then it will show 10 by default
- Scenario: user only wants to see a specific number of events
    * Given the user wants to see a specific number of events, when they change the number of events to display, then the number of events will update to the number the user inputted
## FEATURE: use the app while offline

As a user, I would like to be able to use the app when offline so that I can see the events I
viewed the last time I was online.

- Scenario: user is too broke for data, or their internet is down
    * Given the user can't connect to the internet, when they access the app, then cached data will be shown to the user
- Scenario: user still tries searching for an event
    * Given the user can't connect to the internet, when they try to access information (search a city, fitler events), then the app will show an error
## FEATURE: add a shortcut to the home screen

As a user, I would like to be able to add the app shortcut to my home screen so that I can
open the app faster.

- Scenario: the user wants to add an app shortcut to their home screen
    * Given the user wants to install the app, when the user chooses to add it to the homescreen, then a shortcut should be added to their homescreen 
## FEATURE: display chart with event details

As a user, I would like to be able to see a chart showing the upcoming events in each city so
that I know what events are organized in which city

- Scenario: the user wants to see a chart with the number of upcoming events in each city
    * Given the user is on the events page, when they click the button to see a visualization of the events in all the cities, then they should see a chart of the number of upcoming events in each city
 
## Serverless functions in the app
In this app, serverless functions will be used to:
- Generating visual charts
- Personalized recommendations
- Filtering results for users
- Scaling resources according to traffic and the needs of the users
-  Delivering real time data
-  User authentication
