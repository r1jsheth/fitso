const url = "https://api.getfitso.com/v1/web/getPageData?path=/bangalore/fitso-koramangala-pk-sports/badminton/slots"
import fetch from 'node-fetch'
globalThis.fetch = fetch


fetch(url)
  .then(x => x.json())
  .then(y => {
    const badmintonSlots = y['pageData']['slotSections'];
    console.log(badmintonSlots);
    const todaysSlot = badmintonSlots[0];
    const tomorrowsSlot = badmintonSlots[1];
    badmintonSlots.forEach(slotDay => {
      // console.log({slotDay});
      slotDay['sections'].forEach(section => {
        // console.log({section});
        section['slots'].forEach(slot => {
          // console.log({slot});
          if ('isDisabled' in slot)
          {
            // console.log("ohhh no this slot is booked ---> ", slot['title']);
          } else
          {
            console.log("yess this slot can be booked ---> ", slotDay['title'], ', ', slotDay['subtitle'], ', ', section['title'], ', ', slot['title']);
          }
        });
      });
    });
  });
