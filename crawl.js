import fetch from "node-fetch";
// import y from './sample-slot-data.json' assert { type: "json" };

const facilityCenter = "fitso-koramangala-pk-sports";
const sport = "badminton";

const url = `https://api.getfitso.com/v1/web/getPageData?path=/bangalore/${facilityCenter}/${sport}/slots`;

const SEVEN_PM_SLOT_TIME = "7- 7:50 PM";
const EIGHT_PM_SLOT_TIME = "8- 8:50 PM";
const NINE_PM_SLOT_TIME = "9- 9:50 PM";

fetch(url)
  .then((x) => x.json())
  .then((y) => {
  const sportSlotResult = y["pageData"]["slotSections"];
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
            console.log(
              "Available::",
              slotDay["title"],
              slotDay["subtitle"],
              section["title"],
              slot["title"],
            );
          }
        } else {
        }
      });
    });
  });
});
