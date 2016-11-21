function defaultPrefs(){
  var defaults = {};
//  itemAndId.push({"title":title,"id":id});
  var itemsList = [];
  var allItems = getItems();
  itemsList.push({"title":"Timestamp","id":"timestamp"});
  
  for (i in allItems){
    itemsList.push(allItems[i]);
  }
  
  defaults.itemsAndId = itemsList;
  
//  Logger.log(defaults.itemsAndId);
  
  var properties = PropertiesService.getDocumentProperties();
  var gs = JSON.parse(properties.getProperty('globalSettings'));
  defaults.runTime = properties.getProperty('runTime');
//  gs.appendId;
  
//  var appendChecked = false;
//  if (gs != null){
//    if (gs.appendId != ""){
//       appendChecked = true;
//    }
//  } 
//  defaults.appendChecked = appendChecked;
  
  defaults.appendSelected = "";
  if (gs != null){
    defaults.appendSelected = gs.appendId;
  }
  
  var submitTrigger = getOnFormSubmitStatus();
  defaults.submitTrigger = submitTrigger;

  
  return defaults;
  
}



function savePreferences(prefs) {
//   prefs.appendId
  var properties = PropertiesService.getDocumentProperties();
  properties.setProperty("globalSettings", JSON.stringify(prefs)); 
}
