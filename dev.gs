function testSplit(){
 var text = "Option 1~My Name";
 text = text.split("~",1)[0];
  
  Logger.log(text);
  
  
}



function DEV_getQuestions(){
  
//  {1447943121={title=Check Out An Item, type=MULTIPLE_CHOICE}, 
//  2143171532={title=Check In An Item, type=MULTIPLE_CHOICE}, 
//              992050910={title=Name, type=TEXT}}
  
  var af = FormApp.getActiveForm();
  var items = af.getItems();
  var allQs = {};
  
  for (i in items){
    var curItem = items[i];
    var id = curItem.getId();
    var title = curItem.getTitle();
    var type = curItem.getType();
    var curQInfo ={"title":title,"type":type};
    allQs[id] = curQInfo;
  }
  Logger.log(allQs);
}


function returnData(info){
Logger.log(info);
  return info;
}


function DEV_writeProperty(){
    var properties = PropertiesService.getDocumentProperties();
//  properties.deleteProperty('testProp');
//      properties.setProperty('testProp', "write here");
  
  var store = JSON.stringify({"appendId":"992050910"});
  
    properties.deleteProperty('globalSettings');
  properties.setProperty('globalSettings', store);
}

function DEV_checkProperties(){
  var properties = PropertiesService.getDocumentProperties();
  var propertyValues = properties.getKeys();
  var decode = properties.getProperty('globalSettings');
//  var decode = properties.getProperty("choiceOptions-"+testQuestionId);
//  
//  var decodep = JSON.parse(decode);
//  var decode2p = JSON.parse(decode2);
  
 
  var decode3 = JSON.parse(properties.getProperty('globalSettings'));
//  var decode3 = PropertiesService.getDocumentProperties()
//  var decode3 = decode.getKeys()//  var decode3 = decode.
//  var decode2 = JSON.parse(decode);
  
  Logger.log(propertyValues);
//  Logger.log(decode3.appendId);
//  Logger.log(decode2);
//  Logger.log(decode2[0]);
}

function deleteProperties(){
  // Deletes all user properties.
 var scriptProperties = PropertiesService.getDocumentProperties();
 var documentProperties = PropertiesService.getDocumentProperties();
 var userProperties = PropertiesService.getUserProperties();
  
 scriptProperties.deleteAllProperties();
 documentProperties.deleteAllProperties();
 userProperties.deleteAllProperties();
  
}