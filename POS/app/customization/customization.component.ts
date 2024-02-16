import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'tafelposapp-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent implements OnInit {
  sampleData: any = {
    itemId: '12345',
    itemName: 'Veg Biryani',
    itemCustomization: [
      {
        defaultCustomId: "bf5b0862-3980-4a03-8715-86fe86707ebb",
        groupName: "Size",
        max: 0,
        min: 2,
        type: "radio",
        "customization": [
          {
            "id": "bf5b0862-3980-4a03-8715-86fe86707ebb",
            "name": "Small",
            "groupName": "Size",
            "price": 0,
            "customizationPrice": 0,
            "priceInclusiveGST": 0,
          },
          {
            "id": "fbe67394-d98d-4600-84e4-62f1903a7414",
            "name": "Regular",
            "groupName": "Size",
            "price": 150,
            "customizationPrice":150,
            "priceInclusiveGST": 0,
          },
          {
            "id": "25e8f6b9-b09e-4a94-805d-f666e0f46e4f",
            "name": "Tub",
            "groupName": "Size",
            "price": 220,
            "customizationPrice":220,
            "priceInclusiveGST": 0,
          }
        ]
      },
      {
        groupName: "Add ons",
        defaultCustomId: "bf5b0862-3980-4a03-8715-86fe86707ebb",
        max: 3,
        min: 1,
        type: "checkbox",
        "customization": [
          {
            "id": "bf5b0862-3980-4a03-8715-86fe86707ebb",
            "name": "Small",
            "groupName": "Size",
            "price": 0,
            "customizationPrice":0,
            "priceInclusiveGST": 0,
          },
          {
            "id": "fbe67394-d98d-4600-84e4-62f1903a7414",
            "name": "Regular",
            "groupName": "Size",
            "price": 150,
            "customizationPrice":220,
            "priceInclusiveGST": 0,
          },
          {
            "id": "25e8f6b9-b09e-4a94-805d-f666e0f46e4f",
            "name": "Tub",
            "groupName": "Size",
            "price": 220,
            "customizationPrice":220,
            "priceInclusiveGST": 0,
          }
        ]
      },
      {
        groupName: "Toppings",
        defaultCustomId: "bf5b0862-3980-4a03-8715-86fe86707ebb",
        max: 2,
        min: 0,
        type: "quantity", 
        "customization": [
          {
            "id": "bf5b0862-3980-4a03-8715-86fe86707ebb",
            "name": "Small",
            "groupName": "Size",
            "price": 0,
            "customizationPrice":0,
            "priceInclusiveGST": 0,
          },
          {
            "id": "fbe67394-d98d-4600-84e4-62f1903a7414",
            "name": "Regular",
            "groupName": "Size",
            "price": 150,
            "customizationPrice":220,
            "priceInclusiveGST": 0,
          },
          {
            "id": "25e8f6b9-b09e-4a94-805d-f666e0f46e4f",
            "name": "Tub",
            "groupName": "Size",
            "price": 220,
            "customizationPrice":220,
            "priceInclusiveGST": 0,
          }
        ]
      }]
  }
dataFromItemComponent:{}
  selectedItems: any = [];
  selectedItemsPrice: any = 0;
  prevPage: any;
  name: any;
  itemDetail:any;
  customOptions: any;
  constructor(
    public dialogRef: MatDialogRef<CustomizationComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { 
      console.log(data);
      this.dataFromItemComponent=data;
   }

   ngOnInit() {
    
    this.itemDetail = this.dataFromItemComponent;
    this.customOptions = this.customOptions;
    this.selectedItemsPrice = this.itemDetail.price;
    this.name =this.dataFromItemComponent['name'];
          this.initializeSelectedItems();

   

  }
  initializeSelectedItems() { 
    console.log(" this.itemDetail.customization", this.itemDetail.itemCustomization)
    // this.itemDetail.itemCustomization=this.sampleData.itemCustomization;

    this.itemDetail.itemCustomization.forEach(data => {
      if (data.type == "radio") {
        data.customization.forEach(elements => {    
          if (data.defaultCustomId.includes(elements.id)) {
            elements['selected'] = true;
          } else {
            elements['selected'] = false;
            console.log("e,elements.pricelements.price",elements.price)


          }
        })
      }
      if(data.type=="quantity"){
        data.customization.forEach(elements => {
            elements['showAddButton'] = true;
            elements['quantity']=0;
          
        })
        data['quantity']=0;
      }
      if(data.type=='checkbox'){
        data.customization.forEach(elements => {
          if (data.defaultCustomId.includes(elements.id)) {
            elements['selected'] = true;
          } else {
            elements['selected'] = false;
          }
        
      })
      }
      
    })
    console.log(" this.itemDetail.itemcustomization", this.itemDetail.itemCustomization)

    this.captureSelectedValues();
  }

  captureSelectedValues() {
    this.selectedItems = [];
    this.selectedItemsPrice = this.customOptions ? this.customOptions.basicPrice : this.itemDetail.price;
    let options = this.customOptions ? this.customOptions.customizedData : this.itemDetail.itemCustomization;
    console.log("options",options)
    for (let option of options) {
      let obj = {};
      let selectedOption = []; 
      console.log("options options",option.customization)
      for (let value of option.customization) { 
        if (value.selected) {
          selectedOption.push(value);
          if (value.price) {
            this.selectedItemsPrice = this.selectedItemsPrice + value.customizationPrice;
            console.log("this.selectedItemsPrice if", this.selectedItemsPrice, value.customizationPrice);
          }
        }
        else if(!value.showAddButton && value.showAddButton!=undefined){
          selectedOption.push(value);
          if (value.price) {
            this.selectedItemsPrice = this.selectedItemsPrice + value.customizationPrice*value.quantity;
            console.log("this.selectedItemsPrice else", this.selectedItemsPrice, value.customizationPrice, value.quantity);
          }
        }
      }
      if (selectedOption.length > 0) {
        obj['groupName'] = option.groupName;
        obj['type'] = option.type;
        obj['min'] = option.min;
        obj['max'] = option.max;
        obj['customization'] = selectedOption;
        this.selectedItems.push(obj);
      }
    }
  }
  selectItem(item) {
    this.itemDetail.itemCustomization.forEach(data => {
      if (data.type == 'radio') {
        data.customization.forEach(elements => {
          if (elements.id == item.id) {
            elements['selected'] = true;
          } else {
            elements['selected'] = false;
          }
        })
      }
    })
    this.captureSelectedValues();
  }

  addToCart() {
    let data = {
      // customizedData: this.itemDetail.customization,
      selectedItems: this.selectedItems
     
    }
    this.dialogRef.close(data);
  }
  
  showIncrement=false;
  isCurrentOutletInCart=false;
  addSelectedItem(id,category){
    console.log(category.quantity,"category.quantity")
    let totalQuantity=category.quantity?category.quantity:0
    if(totalQuantity < category.max){
      this.itemDetail.itemCustomization.forEach(data=>{
        if(data.type=='quantity'){
          data.customization.forEach(element=>{
            if(element.id==id){
               element.showAddButton=false;
               element['quantity']=1;
               category.quantity = category.quantity+1
               this.showIncrement=true;
            }
          })
          this.captureSelectedValues()
        }
      })
    }else{
      // this.showToast('bottom', 'Max quantity per food item reached');
    }
  }

  decrementItem(item,category){
    if(item.quantity>=1 ){
      item.quantity= item.quantity-1;
       category['quantity']=category['quantity']-1;
       this.captureSelectedValues();
    }
    if(item.quantity==0){
      item.showAddButton=true;
      this.captureSelectedValues();
    }


  }
  incrementItem(item,category){ 
    let totalQuantity=category.quantity? category.quantity:0
    if(item.quantity < category.max && totalQuantity < category.max ){
      item.quantity= item.quantity+1;
      category['quantity']=category['quantity']+1;
      this.captureSelectedValues();
    }else{
      // this.showToast('bottom', 'Max quantity per food item reached');
    }
  }
  modalDismiss() {
    this.dialogRef.close();
  }

}
