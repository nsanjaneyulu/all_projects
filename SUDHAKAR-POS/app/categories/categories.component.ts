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
  selectedItems: any[] = [];
  customScrollBarConfig: any;

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.menuService.setCategory(category);
  }
  constructor(private menuService: MenuService, private orderItemService: OrderItemService, private messageService: MessageService) { }

  getCategories(): void {
    this.menuService.getMenu();
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
      this.message = message;
      setTimeout(() => {
        this.message = "";
      }, 3000);
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
