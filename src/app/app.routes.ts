import {Routes} from '@angular/router';
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {SearchResultComponent} from './components/search-result/search-result.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: SearchBoxComponent},
    {path: 'search', pathMatch: 'prefix', component: SearchResultComponent}
];
