// generates random integer in a range
function randomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// generate random string of given length
// params -> length = length of random string, default = 6
// params -> mode = including character type, for example
// mode = 111, mode[0] = add numeric, mode[1] = alphaCapital, mode[2] = alphaSmall

function generateRandomId(length = 6, mode = "111") {

  mode = "" + mode;

  let alphaCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let alphaSmall = "abcdefghijklmnopqrstuvwxyz";
  let numeric = "0123456789"

  let selectString = "";
  if (+mode[0]) selectString += numeric; //add numbers
  if (+mode[1]) selectString += alphaCapital; //add cap letters
  if (+mode[2]) selectString += alphaSmall;


  let returnString = "";
  for (let i = 0; i < length; i++) {
    let random = randomIntInRange(0, selectString.length-1);
    returnString += selectString[random];
  }

  return returnString;
}

module.exports = generateRandomId;