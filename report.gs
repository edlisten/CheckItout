function createReportSheet(setName){
    if (!setName){setName = "checkBoxes"};
  var destId = FormApp.getActiveForm().getDestinationId();
  var as = SpreadsheetApp.openById(destId);
  try{
  var sheet = as.insertSheet("Report Out: "+setName);
  } catch(err){
   var sheet = as.getSheetByName("Report Out: "+setName);
   sheet.clear(); 
  }  
}

//////////////////////////////////////////////////////






function formula_createReportSheet(setName) {
  if (!setName){setName = "checkBoxes"};
  var destId = FormApp.getActiveForm().getDestinationId();
  var as = SpreadsheetApp.openById(destId);
  try{
  var sheet = as.insertSheet("Report Out: "+setName);
  } catch(err){
   var sheet = as.getSheetByName("Report Out: "+setName);
   sheet.clear(); 
  }  

  
  //build formula
  var formSheetName = "'Form Responses 1'!";
  var colOut = 9;
  var colIn = 10;
  var colToShow = "3,4,11"; //  A=3, B=4, C=5, .. 

  var frTimeStamp = formSheetName+"A2:A";
  var lastCol = "&COUNTA("+formSheetName+"1:1)&";

  var frSort = 'INDIRECT("'+formSheetName+'"&"R2C'+1+':C"'+lastCol+'"", FALSE)';
  var frIn  = 'INDIRECT("'+formSheetName+'"&"R2C'+colIn+':C'+colIn+'", FALSE)';
  var frOut = 'INDIRECT("'+formSheetName+'"&"R2C'+colOut+':C'+colOut+'", FALSE)';
  
  //break into parts
  var f_unique = "unique(filter("+frOut+", len("+frOut+")))";
  var f_sortIn = "sort({"+frOut+",row("+frTimeStamp+")},"+2+",0)";
  var f_vlookupIn = "vlookup("+f_unique+", "+f_sortIn+", "+2+", 0)";
  var f_sortOut = "sort({"+frIn+",row("+frTimeStamp+")},"+2+",0)";
  var f_vlookupOut = "vlookup("+f_unique+", "+f_sortOut+", "+2+", 0)"; 
  var f_sortDisp = "sort({"+frOut+", row("+frTimeStamp+"), "+frSort+"},"+2+",0)";
  var f_vlookupDisp = "vlookup("+f_unique+", "+f_sortDisp+", {"+colToShow+"}, 0)"; 
  var formula1 = "ArrayFormula( if("+f_vlookupIn+" > iferror("+f_vlookupOut+",0), "+f_vlookupDisp+", ))";
  var formula = "=sort("+formula1+")";
  
  // put formula into sheet
  sheet.getRange(2, 1).setFormula(formula);
  sheet.getRange("a:a").setNumberFormat("mm/dd/yy h:mm:s");
  
}
