// validate if the Id is integer
function idValidator(id) {
    // check if id is empty or not a number
    if(!id || isNaN(id)) {
      return false;
    }
   
    // convert id to a number
    const idNumber = parseInt(id);
  
    // check if id is a positive integer
    if(!Number.isInteger(idNumber) || idNumber < 0) {
      return false;
    }

    return true;
}

// validate if the input is number
function numberValidator(id) {
  // check if id is empty or not a number
  if(!id || isNaN(id)) {
    return false;
  }

  // check if id is a positive number
  const idNumber = parseFloat(id);
  if(idNumber < 0) {
    return false;
  }

  return true;
}

module.exports = {
    idValidator: idValidator,
    numberValidator: numberValidator
};