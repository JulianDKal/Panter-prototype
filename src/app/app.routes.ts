// import { Routes } from '@angular/router';
// import { AppComponent } from './app.component';
// import { HomeComponent } from './components/home/home.component';
// import { PortfolioComponent } from './components/portfolio/portfolio.component';
// import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


// const routes: Routes = [
//   { path: '', component: HomeComponent }, // Default route
//   { path: 'about', component: AboutComponent },
//   { path: 'contact', component: ContactComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}


const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About Page'
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact Page'
    },
    {
        path: 'portfolio',
        component: PortfolioComponent,
        title: 'Portfolio Page'
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        title: 'Not Found'
    }
];

export default routeConfig;
