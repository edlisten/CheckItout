function openAddQuestionSet() {
  var ui = FormApp.getUi();
  var html = HtmlService.createHtmlOutputFromFile('addQuestionSet.html');
  html.setTitle("Add/Edit Question Set");
//  html.setWidth(220).setHeight(280);
  html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
  ui.showSidebar(html);
//  ui.showModalDialog(html, "Add Question Set");
}

function openPreferences() {
  var ui = FormApp.getUi();
  var html = HtmlService.createHtmlOutputFromFile('d_preferences.html');
  html.setTitle("Preferences");
//  html.setWidth(220).setHeight(280);
  html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
  ui.showSidebar(html);
//  ui.showModalDialog(html, "Add Question Set");
}


function formula_addReport(){

  var html = HtmlService.createHtmlOutputFromFile("add-report-formula")
  .setWidth(250).setHeight(500);
  html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
  FormApp.getUi().showModalDialog(html, "Add Lab");  
  
}

function openQuestionAssocation() {
  var ui = FormApp.getUi();
  var html = HtmlService.createHtmlOutputFromFile('questionAssocation.html');
  html.setTitle("Preferences");
//  html.setWidth(220).setHeight(280);
  html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
  ui.showSidebar(html);
//  ui.showModalDialog(html, "Add Question Set");
}