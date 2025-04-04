const { google } = require("googleapis");

const createCalenderEvent = async (eventDetails) => {
  const oauthClient = new google.auth.OAuth2();
  oauthClient.setCredentials({ access_token: process.env.ACCESS_TOKEN });

  const calendar = google.calendar({ version: "v3", auth: oauthClient });


  const startDate = new Date(eventDetails.startDate);
  const endDate = new Date(eventDetails.endDate);     
//   console.log("Parsed Start Date:", startDate); // 👈 log this
//   console.log("Parsed End Date:", endDate); 
  endDate.setDate(endDate.getDate() + 1);  
  const event = {
    summary: eventDetails.summary,
    description: eventDetails.description,
    start: {
        date: startDate.toISOString().split("T")[0],
      timeZone: "Asia/Kolkata",
    },
    end: {
        date: endDate.toISOString().split("T")[0],
      timeZone: "Asia/Kolkata",
    },
  };
  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
};

module.exports = createCalenderEvent;
