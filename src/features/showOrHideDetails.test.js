/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showOrHideDetails.feature');

defineFeature(feature, test => {
    //SCENARIO 1
    test('the events are all collapsed by default', ({ given, when, then }) => {
        let AppComponent;
        given('the user searches for events', () => {
            AppComponent = render(<App />);
        });

        when('the user recieves the list of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });

        then('they will collapse by default', () => {
            const EventDOM = AppComponent.container.firstChild;
            const details = EventDOM.querySelector('.details');
            expect(details).not.toBeInTheDocument();
        });
    });

    test('user wants more details about an upcoming event', ({ given, when, then }) => {
        let AppComponent;
        given('the user wants to see more about an event', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });
        });

        when('the user clicks the "show details" button', async () => {
            const showDetailsButton = AppComponent.queryAllByText('Show Details')[0];
            await userEvent.click(showDetailsButton);
        });

        then('the user can see the details of the event', () => {
           const EventDOM = AppComponent.container.firstChild;
           const details = within(EventDOM).queryByText(/Have you wondered how you can ask Google/);
           expect(details).toBeInTheDocument();
        });
    });

    test('user doesnt care about that anymore', ({ given, when, then }) => {
        let AppComponent;
        given('the user wants to close the details', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;

            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList[0]).toBeTruthy();
            });

            const showDetailsButton = AppComponent.queryAllByText('Show Details')[0];
            await userEvent.click(showDetailsButton);

            const EventDOM = AppComponent.container.firstChild;
           const details = within(EventDOM).queryByText(/Have you wondered how you can ask Google/);
           expect(details).toBeInTheDocument();
        });

        when('the user clicks "hide details"', async () => {
            const hideDetailsButton = AppComponent.queryAllByText('Hide Details')[0];
            await userEvent.click(hideDetailsButton);
        });

        then('the details of that event will collapse', () => {
            const EventDOM = AppComponent.container.firstChild;
           const details = within(EventDOM).queryByText(/Have you wondered how you can ask Google/);
           expect(details).not.toBeInTheDocument();
        });
    });
});