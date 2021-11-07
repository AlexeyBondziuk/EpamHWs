import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "./error-page/error-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then(
        m => m.CoursesModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then(
        m => m.AboutModule
      ),
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '/error'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
