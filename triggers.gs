//https://developers.google.com/apps-script/eap/add-ons/triggers

//function setTriggers(){  //not used by the script
////  var triggers = ScriptApp.getProjectTriggers();
//  var triggers = ScriptApp.getUserTriggers(FormApp.getActiveForm())
////  Logger.log(triggers);
//  if (triggers == ""){
//    ScriptApp.newTrigger("onFormSubmitTrigger")
//    .forForm(FormApp.getActiveForm())
//    .onFormSubmit()
//    .create();
//  }
//}

function respondToFormSubmit(e) { // used by the script
  var addonTitle = 'CheckItOut';
  var form = FormApp.getActiveForm();
  var props = PropertiesService.getDocumentProperties();
  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);

  // Check if the actions of the trigger require authorizations
  // that have not been supplied yet -- if so, warn the active
  // user via email (if possible).  This check is required when
  // using triggers with add-ons to maintain functional triggers.
  if (authInfo.getAuthorizationStatus() ==
      ScriptApp.AuthorizationStatus.REQUIRED) {
    // Re-authorization is required. In this case, the user
    // needs to be alerted that they need to reauthorize; the
    // normal trigger action is not conducted, since it authorization
    // needs to be provided first. Send at most one
    // 'Authorization Required' email a day, to avoid spamming
    // users of the add-on.
    var lastAuthEmailDate = props.getProperty('lastAuthEmailDate');
    var today = new Date().toDateString();
    if (lastAuthEmailDate != today) {
      if (MailApp.getRemainingDailyQuota() > 0) {
        var html = HtmlService.createTemplateFromFile('AuthorizationEmail');
        html.url = authInfo.getAuthorizationUrl();
        html.addonTitle = addonTitle;
        var message = html.evaluate();
        MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
            'Authorization Required',
            message.getContent(), {
                name: addonTitle,
                htmlBody: message.getContent()
            }
        );
      }
      props.setProperty('lastAuthEmailDate', today);
    }
  } else {
    // All required authorizations has been granted,
    // so continue to respond to the trigger event.
    // Main trigger logic here.

//    ScriptApp.newTrigger("onFormSubmitTrigger")
//    .forForm(FormApp.getActiveForm())
//    .onFormSubmit() 
//    .create();
    
    var triggers = ScriptApp.getUserTriggers(FormApp.getActiveForm())
  if (triggers == ""){
    ScriptApp.newTrigger("onFormSubmitTrigger")
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();
  }
  }
}



function getOnFormSubmitStatus(){
  var triggers = ScriptApp.getUserTriggers(FormApp.getActiveForm());
  //   var triggers = ScriptApp.getProjectTriggers();
  var exists = false;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getEventType() == ScriptApp.EventType.ON_FORM_SUBMIT) {
      exists = true;
      // Some code here - other options are:
      // ScriptApp.EventType.ON_EDIT
      // ScriptApp.EventType.ON_FORM_SUBMIT
      // ScriptApp.EventType.ON_OPEN
    }
  }
  return exists;  
  
}

function enableTrigger(e){

if (e == true){
respondToFormSubmit();
} else {
// delete trigger
var triggers = ScriptApp.getUserTriggers(FormApp.getActiveForm());
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getEventType() == ScriptApp.EventType.ON_FORM_SUBMIT) {
      ScriptApp.deleteTrigger(triggers[i]);
      // Some code here - other options are:
      // ScriptApp.EventType.ON_EDIT
      // ScriptApp.EventType.ON_FORM_SUBMIT
      // ScriptApp.EventType.ON_OPEN
    }
  }
}



}

