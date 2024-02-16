import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { masterData } from "../../../environments/masterdata/masterdata";
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { endpoints } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  permissionsData;
  permissionList = ['add', 'edit', 'delete', 'generate']
  permissionTypes = [
    { id: 1, permissionType: "Read", access: '{ "add": 1 }' },
    { id: 2, permissionType: "Read/Write", access: '{ "add": 1, "edit": 1, "delete": 0 }' },
  ];
  permissionsForm;
  userRoleForm;
  userRoleFormFields = {
    userRole: null
  };
  permissionsFormFields = {
    permissionType: null
  };
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private httpService: HttpService, ) { }

  ngOnInit() {
    this.getPermissionsData();
    this.permissionsForm = this.formBuilder.group({
      permissionType: new FormControl(this.permissionsFormFields.permissionType),
    });
    this.userRoleForm = this.formBuilder.group({
      userRole: new FormControl(this.userRoleFormFields.userRole),
    });
  }
  getPermissionsData() {
    this.httpService.doGet(endpoints.get.getAccessArea).subscribe((result: any) => {
      if (result.status === 'success') {
        this.permissionsData = result.data;
        this.permissionsData.map(item => {
          if (item.pages.length) {
            item.pages.map(page => {
              // item.permissionKeysSet = [];
              const pageObj = JSON.parse(page.permissions);
              item.permissionKeysSet = Object.keys(pageObj).map(key => ({ key, permission: pageObj[key] }));
            });
          }
        });
        console.log(this.permissionsData);
      }
    }, err => {
      console.log(err);
    });
  }
  permissionsUpdateForm(role_id, pkey, pkeyValue, permission_page_title, permissionsDataIndex, pagesIndex, permissionKeysSetIndex) {
    // console.log(role_id, pkey, permission_page_title, permissionsDataIndex, pagesIndex, permissionKeysSetIndex);
    const payload = {
      "user_id": JSON.parse(localStorage.getItem('userData')).user_id,
      "permissionData": [
        {
          "role_id": role_id,
          "pages": [
            {
              "page_title": permission_page_title,
              "permission": {
                [pkey]: pkeyValue == 1 ? 0 : 1
              }
            }
          ]
        }
      ]
    };
    console.log(payload);
    this.httpService.doPost(endpoints.post.createOrUpdatePermissions, payload).subscribe((result: any) => {
      if (result.status === 'success') {
        this.getPermissionsData();
        console.log(this.permissionsData);
      }
    }, err => {
      console.log(err);
    });
  }
  RoleUpdate(data) {
    console.log(data);
  }
}
