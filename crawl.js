import fetch from "node-fetch";
// import * as dotenv from "dotenv";
// dotenv.config();

const facilityCenter = "fitso-koramangala-pk-sports";
const sport = "badminton";

const url = `https://api.getfitso.com/v1/web/getPageData?path=/bangalore/${facilityCenter}/${sport}/slots`;

const SEVEN_PM_SLOT_TIME = "7- 7:50 PM";
const EIGHT_PM_SLOT_TIME = "8- 8:50 PM";
const NINE_PM_SLOT_TIME = "9- 9:50 PM";

const TWILIO_ACCOUNT_SID = "asd";
const TWILIO_AUTH_TOKEN = "asd";

const sendSms = (message, to) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(TWILIO_ACCOUNT_SID + ":" + TWILIO_AUTH_TOKEN).toString(
          "base64"
        ),
    },
    body: `Body=${message}&From=+19458995983&To=+91${to}`,
  };

  fetch(
    "https://api.twilio.com/2010-04-01/Accounts/" +
      TWILIO_ACCOUNT_SID +
      "/Messages.json",
    options
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendWhatsApp = (message, to) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(TWILIO_ACCOUNT_SID + ":" + TWILIO_AUTH_TOKEN).toString(
          "base64"
        ),
    },
    body: `Body=${message}&From=whatsapp%3A%2B14155238886&To=whatsapp%3A%2B91${to}`,
  };

  fetch(
    "https://api.twilio.com/2010-04-01/Accounts/" +
      TWILIO_ACCOUNT_SID +
      "/Messages.json",
    options
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// sendWhatsApp("Hi Vishal", "917407661082");
/**
 * TODO:
 *    1. Environment variables ---> done
 *    2. Encode params
 *    3. CRON Job
 */

let finalMessage = "------------- Fitso available slots -------------\n";

fetch(url)
  .then((x) => x.json())
  .then((y) => {
    const sportSlotResult = y["pageData"]["slotSections"];
    let foundSlots = false;
    sportSlotResult.forEach((slotDay) => {
      slotDay["sections"].forEach((section) => {
        section["slots"].forEach((slot) => {
          if (!("isDisabled" in slot)) {
            if (
              [
                SEVEN_PM_SLOT_TIME,
                EIGHT_PM_SLOT_TIME,
                NINE_PM_SLOT_TIME,
              ].includes(slot["title"])
            ) {
              foundSlots = true;
              finalMessage += `${slotDay["title"]} ${slotDay["subtitle"]} ${section["title"]} ${slot["title"]} \n`;
            }
          } else {
          }
        });
      });
    });
    if (!foundSlots) {
      finalMessage += "Ohhh no!! all slots are sold out!\n";
    }
    finalMessage += " Say thanks to Raj :)";
    console.log(finalMessage);
    // sendSms(finalMessage, "8116676118");
  });
