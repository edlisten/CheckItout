function onInstall() {
  onOpen();
}

function onOpen() {
  var ui = FormApp.getUi();
  ui.createAddonMenu()
  .addItem("Add/Edit Question Set", 'openAddQuestionSet')
  .addItem("Preferences", 'openPreferences')
//  .addItem("(Expirement) Add Report Via Formula", 'formula_addReport')
//  .addItem("(dev) testHtml", "openTestHtml")
  .addToUi(); 
//    respondToFormSubmit();
  
  
  
}


function onFormSubmitTrigger(){
var startTime = new Date();
//  var lock = LockService.getDocumentLock();
//  lock.waitLock(30000);
try {

  
   var af = FormApp.getActiveForm();
  var properties = PropertiesService.getDocumentProperties();
  //  var keys = properties.getKeys();
  var keys = getSetKeys(properties, af);
  
  var gs = JSON.parse(properties.getProperty('globalSettings'));
  var appendId = false;
  if (gs != null){
    var appendId = gs.appendId;
  } 
  //992050910={title=Name, type=TEXT}
  
  for (i in keys) {
    var key = keys[i];
    var qSet = JSON.parse(properties.getProperty(key));
    updateForm(qSet, af, appendId);
    
  }
  var endTime = new Date();
  var runTime = (endTime-startTime)/1000;
  properties.setProperty("runTime", runTime); 
//  Logger.log(runTime);

} catch(err) {
lock.releaseLock();
var error = "Error: " + err;
properties.setProperty("runTime", error);

}
//lock.releaseLock();
  
}

