import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { MenuService } from '../menu.service';
import { OrderItemService } from '../order-item.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'tafelposapp-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category;
  searchCategory: any;
  message: string;
  outeltId=""
  selectedItems: any[] = [];
  customScrollBarConfig: any;
outletDetails:any=[];
mallName=""
  onSelectCategory(category: Category): void { 
    this.selectedCategory = category;
    this.orderItemService.selectedCategory.emit(category);
    this.menuService.setCategory(category);
    this.orderItemService.selectedOutletId=this.outeltId

  }
  constructor(private menuService: MenuService, private orderItemService: OrderItemService, private messageService: MessageService) {
    this.outletDetails = JSON.parse(localStorage.getItem('outletDetails'))
    console.log("outletDetails",this.outletDetails)
    this.outeltId= this.outletDetails[0].id
    this.orderItemService.selectedOutletId=this.outeltId
    localStorage.setItem('selectedOutletId',this.outeltId)
    this.mallName = localStorage.getItem('mallName')

   }
   selectoutLet(outletId){
     console.log("outletId",outletId)
     this.outeltId=outletId;
     localStorage.setItem('selectedOutletId',this.outeltId)
     this.orderItemService.selectedOutletId=this.outeltId;
     this.getCategories()
     this.onSelectCategory({ "id": "", "name": "All Products" });
    this.getMessage();
    this.getSelectedItems();
   }

  getCategories(): void {
    this.menuService.getMenu(this.outeltId);
    this.orderItemService.selectedOutletId=this.outeltId
    this.menuService.data$.subscribe((menu) => {
      let menuCategories = [{ "id": "", "name": "All Products" }];
      if (menu && menu.menus) {
        menu.menus[0].subMenus.forEach(function (item) {
          if (item.availability.available) {
            menuCategories.push({ "id": item.id, "name": item.name });
          }
        });
        this.categories = menuCategories;

      }
    });
  }

  onClearOrder(): void {
    this.orderItemService.setClearOrderStatus(true);
  }

  getSelectedItems(): void {
    this.orderItemService.getSelectedItems().subscribe(selectedItems => {
      this.selectedItems = selectedItems;
    });
  }

  getMessage(): void {
    this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.message = message;
      }
      else {
        this.message = "Internet Connected";
      }

      setTimeout(() => {
        this.message = message;
      }, 1000);
    });
  }

  ngOnInit() {
    this.getCategories();
    this.onSelectCategory({ "id": "", "name": "All Products" });
    this.getMessage();
    this.getSelectedItems();
    this.customScrollBarConfig = {
      suppressScrollX: true
    }
  }

}
