import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category';
import { CategoryItem } from '../category-item';
import { OrderItemService } from '../order-item.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'tafelposapp-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit {
  @Input() category: Category;
  categoryItems: CategoryItem[];
  selectedItems: CategoryItem[];
  unselectedItem: CategoryItem;
  searchCategoryItem: any;
  customScrollBarConfig: any;

  constructor(private menuService: MenuService, private orderItemService: OrderItemService) { }

  getAllCategoryItems(): void {
    this.menuService.data$.subscribe((menu) => {
      let menuItems = [];
      if (menu && menu.menus) {
        menu["menus"][0].subMenus.forEach((category) => {
          category.items.forEach((item) => {
            if(item.availability.available){
            menuItems.push({ "id": item.id, "name": item.name, "price": item.price });
            }
          })
        });
        this.categoryItems = menuItems;
      }
    });
  }

  getCategoryItems(): void {
    this.menuService.getCategory()
      .subscribe(selectedCategory => {
        this.menuService.data$.subscribe((menu) => {
          let menuItems = [];
          if (menu && menu.menus) {
            menu.menus[0].subMenus.forEach(function (category) {
              if (selectedCategory.id === category.id || selectedCategory.id === "") {
                category.items.forEach(function (item) {
                  if(item.availability.available){
                  menuItems.push({ "id": item.id, "name": item.name, "price": item.price });
                  }
                })
              }
            });
            this.categoryItems = menuItems;
          }
        });
      });
  }

  getSelectedItems(): void {
    this.orderItemService.getSelectedItems()
      .subscribe(selectedItems => {
        this.categoryItems.forEach((categoryItem, index) => {
          this.categoryItems[index].isSelected = false;
          selectedItems.forEach(selectedItem => {
            if (selectedItem.id === categoryItem.id && selectedItem.itemCount === 0) {
              this.categoryItems[index].isSelected = false;
            } else if (selectedItem.id === categoryItem.id && selectedItem.itemCount > 0) {
              this.categoryItems[index].isSelected = true;
            }
          });
        });
      });
  }

  onSelectItem(categoryItem: CategoryItem, index) {
    this.categoryItems[index].isSelected = true;
    this.orderItemService.setOrderItem(categoryItem);
  }

  ngOnInit() {
    this.getCategoryItems();
    this.getAllCategoryItems();
    this.getSelectedItems();
    this.customScrollBarConfig = {
      suppressScrollX: true
    }
  }

}
