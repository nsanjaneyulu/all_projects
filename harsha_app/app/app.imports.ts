import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const angularCoreImports = [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
];

// third party imports
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgProgressModule } from 'ngx-progressbar';

const thirdPartyImports = [
    ToastrModule.forRoot(),
    NgProgressModule,
    CKEditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
]

// application routing
import { AppRoutingModule } from './app.routes';

const routing = [AppRoutingModule];

export const appImports = [
    [...angularCoreImports],
    [...thirdPartyImports],
    [...routing]
]