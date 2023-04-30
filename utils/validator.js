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

// validate if the name is exist
function nameValidator(colorId, name) {
    // read file
    colours = JSON.parse(fs.readFileSync('./json/colours.json', 'utf8'));

    // check the name
    for(let i = 0; i < colours.length; i++) {
        if(colours[i].colorId === colorId) {
            continue;
        }
        
        if(colours[i].name === name) {
          return true;
        }
    }

    return false;
}

module.exports = {
    idValidator: idValidator,
    nameValidator: nameValidator
};