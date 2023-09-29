/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/filterNumberOfEvents.feature');

defineFeature(feature, test => {
    test('Display 32 events by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user hasn\'t specified an amount of events to display', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        let EventListItems;
        when('they choose to display all cities and events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems[0]).toBeTruthy();
              });
        });

        then('it will show 32 by default', () => {
            expect(EventListItems.length).toBe(32);
        });
    });


    test('User only wants to see a specific number of events', ({ given, when, then }) => {
        let AppComponent;

        given('the user wants to see a specific number of events', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });

        when('they change the number of events to display', async () => {
            const input = AppComponent.queryByTestId('numberOfEventsInput');
            await userEvent.type(input, '{backspace}{backspace}5');
        });

        then('the number of events will update to the number the user inputted', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(5);
        });
    });
});