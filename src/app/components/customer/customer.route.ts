import { Routes } from '@angular/router';

import { CustomerEditorComponent } from './customer-editor.component';

// Route Configuration
export const partyRoutes: Routes = [
  { path: 'partylist/:id', component: CustomerEditorComponent }
];