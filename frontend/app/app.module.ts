import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { ItemComponent } from './item/item.component';

import { TreeService } from './shared/tree.service'

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	declarations: [
		AppComponent, 
		TreeComponent,
		ItemComponent
	],
	providers: [TreeService],
	bootstrap: [AppComponent]
})

export class AppModule {
}