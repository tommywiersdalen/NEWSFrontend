export function checkIfValuesAreInRange(temp: string, heart: string, resp: string) {
    const tempScore = parseFloat(temp.replace(",", "."));
    const heartScore = parseFloat(heart.replace(",", "."));
    const respScore = parseFloat(resp.replace(",", "."));
    let tempMessage = "";
    let heartMessage = "";
    let respMessage = "";
    if (tempScore < 31 || tempScore > 42) {
        tempMessage =
            "Temp is out of the valid range, please enter a value between 31 and 42";
    }
    if (heartScore < 25 || heartScore > 220) {
        heartMessage =
            "Heart rate is out of the valid range, please enter a value between 25 and 220";
    }
    if (respScore < 3 || respScore > 60) {
        respMessage =
            "Respiratory rate is out of the valid range, please enter a value between 3 and 60";
    }
    if (tempMessage || heartMessage || respMessage) {
        return tempMessage + " " + heartMessage + " " + respMessage;
    } else {
        return true;
    }
}

