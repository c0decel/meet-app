'use strict';

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://c0decel.github.io/meet-app/"
];


const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  //decode auth code from URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
    if (error) {
      return reject(error);
    }
    return resolve(response);
  });
})
  .then((response) => {
    //respond with oauth token
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(response),
    };
  })
  .catch((error) => {
    //handle error
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  });
};

module.exports.getCalendarEvents = async (event) => {
  //get access token
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  //set credentials
  oAuth2Client.setCredentials({ access_token });
  //get calendar events
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
  .then((results) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  })
  .catch((error) => {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  });
};