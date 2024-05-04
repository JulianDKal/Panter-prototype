import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
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
