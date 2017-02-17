import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './components/application/app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { DatasetEditorComponent } from "./components/dataset/dataset-editor.component";
import { DatasetListComponent } from "./components/dataset/dataset-list.component";
import { StudyEditorComponent } from "./components/study/study-editor.component";
import { StudyListComponent } from "./components/study/study-list.component";


import { LoginComponent } from "./components/login/login.component";
import { DatasetService } from "./services/dataset.service";
import { StudyService } from "./services/study.service";
import { Auth } from "./services/auth.service";
import { AuthHttp, AuthConfig, provideAuth } from 'angular2-jwt';


@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        DatasetEditorComponent,
        DatasetListComponent,
        StudyEditorComponent,
        StudyListComponent,
        LoginComponent,
    ], 
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [DatasetService, StudyService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
