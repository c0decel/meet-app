/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    //SCENARIO 1
    test('User opens the app when no city is searched', ({ given, when, then }) => {
        given('the user hasn\'t searched a city', () => {

        });

        let AppComponent;
        when('they open the application', () => {
            AppComponent = render(<App />);
        });

        then('they should see upcoming events from all cities', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    //SCENARIO 2
    test('User should see a list of suggestions when they search a city', ({ given, when, then }) => {
        let AppComponent;
        given('the search bar is open', () => {
            AppComponent = render(<App />);
        });

        let CitySearchDOM;
        when('the user starts typing a search', async () => {

            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
            await userEvent.type(cityTextBox, "Berlin");          

        });

        then('they should recieve a list of cities that match their search', async () => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);
        });
    });

    //SCENARIO 3
    test('User clicks on the city they are interested in', ({ given, when, then, and }) => {
        let AppComponent;
        let AppDOM;
        let CitySearchDOM;
        let cityTextBox;
        given('the user searches a city', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            cityTextBox = within(CitySearchDOM).queryByRole('textbox');
            await userEvent.type(cityTextBox, "Berlin");

        });

        let suggestionListItems;
        and('the list of suggested cities is showing', () => {
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem'); 
            expect(suggestionListItems).toHaveLength(2);
        });

        when('they click on a city of interest', async () => {
            await userEvent.click(suggestionListItems[0]);
        });

        then('the events will filter to show events from that city', () => {
            expect(cityTextBox.value).toBe('Berlin, Germany');
        });

        and('the user should recieve a list of events in that', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();

            const berlinEvents = allEvents.filter(event => event.location === cityTextBox.value)
                expect(EventListItems).toHaveLength(berlinEvents.length);
        });
    });
});