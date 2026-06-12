// A simple function to check if the birthday has arrived
function checkTimeLock(unlockTimestamp) {
    const now = new Date().getTime();
    if (now >= unlockTimestamp) {
        showSurpriseContent();
    } else {
        showCountdown(unlockTimestamp - now);
    }
}
