// import { Tabs } from "ionic-angular/umd";

export var EN_TAB_PAGES = {
  EN_TP_HOME: 0,
  EN_TP_STOCK:1,
  EN_TP_PROFILE: 2,
  
  EN_TP_LENGTH: 3, 
}

export var Globals = {
  navCtrls : new Array(EN_TAB_PAGES.EN_TP_LENGTH),
  tabIndex:0,
  tabs: <any>{},
}

export var DeRegisterBackButton={
  function:undefined
};