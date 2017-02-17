import { Routes } from '@angular/router';

import { PipelineListComponent }    from './list-pipeline.component';

// Route Configuration
export const pipelineRoutes: Routes = [
  { path: 'pipelines', component: PipelineListComponent }
];