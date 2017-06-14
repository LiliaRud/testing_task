import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/data.service';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { ItemComponent } from './item/item.component';

import { TreeService } from './shared/tree.service'

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		//InMemoryWebApiModule.forRoot(InMemoryDataService)
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