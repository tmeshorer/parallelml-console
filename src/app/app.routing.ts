/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { StudyListComponent} from "./components/study/study-list.component"
import { StudyEditorComponent} from "./components/study/study-editor.component"
import { DatasetListComponent }    from './components/dataset/dataset-list.component';
import { DatasetEditorComponent }    from './components/dataset/dataset-editor.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    { path: 'studies', component: StudyListComponent },
    { path: 'studies/detail/:id', component: StudyEditorComponent },
    { path: 'datasets', component: DatasetListComponent },
    { path: 'datasets/detail/:id', component: DatasetEditorComponent },
];    
    

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
