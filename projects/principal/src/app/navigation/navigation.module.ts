import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { MaterialModule } from '../material-module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineModule } from '../timeline/timeline.module';
import { RouterModule } from '@angular/router';
import { NavigationPrivatesComponent } from './navigation-privates/navigation-privates.component';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [NavigationComponent, NavigationPrivatesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    TimelineModule, RouterModule, MomentModule ],
    providers: []
})
export class NavigationModule {}
