



function updateForm(qSet, af, appendId) {
  var skipText = "Skip";

  var chkOutResult = getLastResponceSubmitted(qSet.chkOutQId, af);
  var chkInResult = getLastResponceSubmitted(qSet.chkInQId, af);
  var chkOutItem = getAsItem(qSet.chkOutQId, af);
  var chkInItem = getAsItem(qSet.chkInQId, af);
  var timestamp = getLastResponceTimestamp(af);
  var appendResult = "";
  
  
  if (appendId != false){
    if (appendId == "timestamp"){
      var appendResult = timestamp;
    } else {
    var appendResult = getLastResponceSubmitted(appendId, af);
      }
    appendResult = " ~ "+ appendResult;
  }
  
  
  //Check Out Items
  var type = qSet.qType;
  var isText = false;
  if (type == "TEXT_MC" || type == "TEXT_List" || type == "TEXT_Chk"){isText = true;}
  if (chkOutResult[0] != undefined && chkOutResult[0] != qSet.chkOutEmptyTxt && chkOutResult[0] != skipText){
    if (isText == false){
      removeChoices(chkOutItem, chkOutResult, qSet.chkOutEmptyTxt, skipText);
    }
    if (Array.isArray(chkOutResult)){
      for (j in chkOutResult){
        chkOutResult[j] = chkOutResult[j] + appendResult;
      }
    } else {
      chkOutResult += appendResult;  
    }
    addChoices(chkInItem, chkOutResult, qSet.chkInEmptyTxt);
  }
  
  
  //Check In Items
  if (chkInResult[0] != undefined && chkInResult[0] != qSet.chkInEmptyTxt && chkInResult[0] != skipText){
    removeChoices(chkInItem, chkInResult, qSet.chkInEmptyTxt, skipText);
    if (Array.isArray(chkInResult)){
      for(i in chkInResult){
        chkInResult[i] = chkInResult[i].split(" ~ ",1)[0];
      } 
    } else {
      chkInResult = chkInResult.split(" ~ ",1)[0];
    }
    if (isText == false){
      addChoices(chkOutItem, chkInResult, qSet.chkOutEmptyTxt);
    }
  }
  
  
}

function createQuestionSet(info){
  respondToFormSubmit();
  if (!info){ info = {'chkOutEmptyTxt':'No Items Are Checked Out','qType':"CHECKBOX",'chkInEmptyTxt':'All Items Are Checked Out','setName':'Item','chkOutQId':'','chkInQId':''};}
  //  var dataSet = {'setName':setName,'qType':qType,'chkOutEmptyTxt':chkOutEmptyTxt,'chkInEmptyTxt':chkInEmptyTxt,'chkOutQId':chkOutQId,'chkInQId':chkInQId};
  var af = FormApp.getActiveForm();
  
  if (info.chkOutQId == ""){
    
    // Create Questions
    var isText = false;
    switch(info.qType){
      case  "MULTIPLE_CHOICE": 
        var itemChkOut = af.addMultipleChoiceItem();
        var itemChkIn = af.addMultipleChoiceItem();
        break;
      case "LIST":
        var itemChkOut = af.addListItem();
        var itemChkIn = af.addListItem();
        break;
      case "CHECKBOX":
        var itemChkOut = af.addCheckboxItem();
        var itemChkIn = af.addCheckboxItem();
        break;
      case "TEXT_MC":
        var itemChkOut = af.addTextItem();
        var itemChkIn = af.addMultipleChoiceItem();
        isText= true;
        break;
      case "TEXT_List":
        var itemChkOut = af.addTextItem();
        var itemChkIn = af.addListItem();
        isText= true;
        break;
      case "TEXT_Chk":
        var itemChkOut = af.addTextItem();
        var itemChkIn = af.addCheckboxItem();
        isText= true;
        break;
    }
    
    itemChkOut.setTitle('Check out '+ info.setName);
    if (isText == false){ itemChkOut.setChoices([itemChkOut.createChoice("Enter your items here")]);}
    itemChkIn.setTitle('Check in '+info.setName);
    itemChkIn.setChoices([itemChkIn.createChoice(info.chkInEmptyTxt)]);

    //Save Questions to Properties    
    info.chkOutQId = itemChkOut.getId();
    info.chkInQId = itemChkIn.getId();
  }
  
  var properties = PropertiesService.getDocumentProperties();
  properties.setProperty("set-"+info.setName, JSON.stringify(info));  
  
  return;
}

