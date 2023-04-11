import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertDangerComponent } from './components/alert-danger/alert-danger.component';
import { AlertWarningComponent } from './components/alert-warning/alert-warning.component';
import { AlertInfoComponent } from './components/alert-info/alert-info.component';
import { AlertSuccessComponent } from './components/alert-success/alert-success.component';
import { FormsModule } from '@angular/forms';
import { CollectionFilterPipe } from './pipes/collection-filter.pipe';

@NgModule({
  declarations: [
    AlertDangerComponent,
    AlertWarningComponent,
    AlertInfoComponent,
    AlertSuccessComponent,
    CollectionFilterPipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,

  ],
  exports: [
    AppRoutingModule,
    ReactiveFormsModule,
    AlertDangerComponent,
    AlertWarningComponent,
    AlertInfoComponent,
    AlertSuccessComponent,
    FormsModule,
    CollectionFilterPipe,

  ]
})
export class SharedModule { }
