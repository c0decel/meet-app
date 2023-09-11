import mockData from './mock-data';
//function takes event array, uses map to create a new array with only locations
//removes duplicates by creating another new array with spread operator, spreads set
//set removes all duplicates
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};
//fetches list of all events
export const getEvents = async () => {
    return mockData;
};