function getAsItem(id, af){
//  if (!id){ id = "1447943121";}
//  if (!af){ af = FormApp.getActiveForm();}
  
  var item = af.getItemById(id);
  var type = item.getType();
  
    switch(type){
      case  FormApp.ItemType.MULTIPLE_CHOICE: 
        var asItem = item.asMultipleChoiceItem();
        break;
      case FormApp.ItemType.LIST:
        var asItem = item.asListItem();
        break;
      case FormApp.ItemType.CHECKBOX:
        var asItem = item.asCheckboxItem();
        break;
    }

return asItem;
  
}


function subtractArrays(a,b){
  var seen = [], diff = [];
  for ( var i = 0; i < b.length; i++)
    seen[b[i]] = true;
  for ( var i = 0; i < a.length; i++)
    if (!seen[a[i]])
      diff.push(a[i]);
  return diff;
}




function addChoices(item, responce, replaceText, appendTF){
  if (!Array.isArray(responce)){responce = [responce];}
  if (!appendTF){appendTF = false;}
//  appendTF = true;
  var appendTxt ="";
//  
//  if (appendTF == true){
//   var appendTxtName = "My Name";
//   appendTxt = "~"+ appendTxtName;
//  }
  
  
  //Remove Choice from Check Out
  
  var choices = item.getChoices();
  if (choices[0].getValue() == replaceText){
    choices =[];
  }
  
//  add responce
  for (i in responce){
    choices.push(item.createChoice(responce[i]+appendTxt));
  }
 
  // sort the responces
  var unsortedChoices = [];
  for(var n in choices){
    unsortedChoices.push([choices[n].getValue(),choices[n]]);// add all existing items    
  }
  
  unsortedChoices.sort(function(x,y){
    var xp = x[0];
    var yp = y[0];
    return xp == yp ? 0 : xp > yp ? 1 : -1;//  sort on choice value only
  });

    var sortedChoices = [];
  for(var n in unsortedChoices){
    sortedChoices.push(unsortedChoices[n][1]);// create a new array with only useful objects    
  }   
    item.setChoices(sortedChoices); 
}



function getLastResponceTimestamp(af){
  //  http://stackoverflow.com/questions/1091372/getting-the-clients-timezone-in-javascript
  if (!af){ af = FormApp.getActiveForm();}
  
  var allResponces = af.getResponses();
  var lastResponces = allResponces[allResponces.length-1];
  var timestamp = lastResponces.getTimestamp();
//  var formattedDate = Utilities.formatDate(timestamp, "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
//  var timezone = timestamp.toString().match(/\(([A-Za-z\s].*)\)/)[1];
  var timezone = timestamp.toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
  var formattedDate = Utilities.formatDate(timestamp, timezone,"MMM d, yyyy 'at' h:mm aaa");
  
  return formattedDate; 
}


function getLastResponceSubmitted(id, af){
  if (!id){ id = "1447943121";}
  if (!af){ af = FormApp.getActiveForm();}
  
  var item = af.getItemById(id);
  var allResponces = af.getResponses();
  var lastResponces = allResponces[allResponces.length-1];
  var timestamp = lastResponces.getTimestamp();

  try{
    var lastResponceForItem = lastResponces.getResponseForItem(item).getResponse();
  } catch(err) {
    var lastResponceForItem = "";
  }
  
  
  
  return lastResponceForItem; 
}

function removeChoices(item, responce, noMoreText, skipText){
//  Logger.log(item+"-"+responce+"-"+noMoreText+"-"+skipText);
  
  if (!noMoreText){ noMoreText = "No More Choices";}
  if (!Array.isArray(responce)){responce = [responce];}
  
  //Remove Choice from Check Out
  var oldChoices = item.getChoices();
  var oldChoicesValues =[];
  for (i in oldChoices){
   var curVal =  oldChoices[i].getValue();
   oldChoicesValues.push(curVal)
  }
  var newChoicesValues = subtractArrays(oldChoicesValues,responce);
  var newChoices = [];

  if (newChoicesValues.length == 0){ 
  newChoicesValues.push(noMoreText);
  }
  
  for (j in newChoicesValues){
   newChoices.push(item.createChoice(newChoicesValues[j])) 
  }
  item.setChoices(newChoices);  
}

function getSetKeys(properties, af){
  if (!af){ af = FormApp.getActiveForm(); }
  if (!properties){properties = PropertiesService.getDocumentProperties();}
  var keys = properties.getKeys();
  var setsArray = [];
  for (i in keys){
    var key = keys[i];
//    var qSet = JSON.parse(properties.getProperty(key));
    var split3 = key.slice(0,3); 
    if (split3 == "set"){
      var qSet = JSON.parse(properties.getProperty(key));
      var runUpdate = true;
      var af = FormApp.getActiveForm();  
      try{
        af.getItemById(qSet.chkOutQId).getType();
        af.getItemById(qSet.chkInQId).getType();
      } catch(err) {
        //     remove properties
        runUpdate = false;
        properties.deleteProperty(key);  
      }
      if (runUpdate == true){
        setsArray.push(key); 
      }
    }
  }
  return setsArray;
}

function getSetData(key){
  if(!key){key = getSetKeys(properties)[0]}
  if (key == "New"){
    var keyData = {'setName':"Item",'qType':"CHECKBOX",'chkOutEmptyTxt':"All Items Are Checked Out",'chkInEmptyTxt':"All Items Are Checked In","chkOutQId":"","chkInQId":""};
  } else {
  var properties = PropertiesService.getDocumentProperties();
  var keyDataString = properties.getProperty(key);
  var keyData = JSON.parse(keyDataString);
  }
    
    return keyData;
}

function getItems(af){
 if (!af){ af = FormApp.getActiveForm(); }
  var items = af.getItems();
  var itemAndId = [];
  for (i in items){
    var title = items[i].getTitle();
    var id = items[i].getId();
    itemAndId.push({"title":title,"id":id});
  }
  
//  Logger.log(itemAndId);
  return itemAndId;
  
  
  
}

