/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;

    beforeAll(async () => {
        allEvents = await getEvents();
      });

    beforeEach(() => {
        EventComponent = render(<Event event={allEvents[0]} />);
      });

    test("renders event name", () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
      });

    test('renders event location', () => {
      expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test('has a showdetails button', () => {
      const button = EventComponent.queryByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('by default, events are hidden', () => {
      const eventDetails = EventComponent.queryByText("Description");
     expect(eventDetails).not.toBeInTheDocument();
   });

   test('shows details upon being clicked', async () => {
    const showDetailsButton = EventComponent.queryByText('Show Details');
    await userEvent.click(showDetailsButton);
    expect(EventComponent.queryByText(/Have you wondered how you can ask Google/)).toBeInTheDocument();
    });

    test('hides details upon being clicked', async () => {
      const hideDetailsButton = EventComponent.queryByText('Hide Details');
        await userEvent.click(hideDetailsButton);
        expect(EventComponent.queryByText(/Have you wondered how you can ask Google/)).not.toBeInTheDocument();
      });
});