import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import {render} from '@testing-library/react';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
    });

    test('has in input box', () => {
        const input = NumberOfEventsComponent.queryByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    test('default number of events is 32', () => {
        const input = NumberOfEventsComponent.queryByRole('textbox');
        expect(input).toHaveValue('32');
    });

    test('updates when a user types', async () => {
       const input = NumberOfEventsComponent.queryByRole('textbox');
        await userEvent.type(input, '{backspace}{backspace}5');
        expect(input).toHaveValue('5');
    });
});