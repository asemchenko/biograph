import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FooterComponent} from './components/footer/footer.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MainNavComponent} from './components/main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {HomeComponent} from './components/home/home.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TokenInterceptorService} from './services/token-interceptor/token-interceptor.service';
import {CategoriesPageComponent} from './components/categories-page/categories-page.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {NewCategoryDialogComponent} from './components/categories-page/new-category-dialog/new-category-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ColorPickerModule} from 'ngx-color-picker';
import {AttributesPageComponent} from './components/attributes-page/attributes-page.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NewAttributeDialogComponent} from './components/attributes-page/new-attribute-dialog/new-attribute-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {StringToDatePipe} from './pipes/string-to-date.pipe';
import {EventsPageComponent} from './components/events-page/events-page.component';
import {EventDialogComponent} from './components/events-page/event-dialog/event-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxFileDropModule} from 'ngx-file-drop';
import {ParameterComponent} from './components/events-page/event-dialog/parameter/parameter.component';
import {TagsComponent} from './components/events-page/event-dialog/tags/tags.component';
import {TagsPageComponent} from './components/tags-page/tags-page.component';
import {TagDialogComponent} from './components/tags-page/tag-dialog/tag-dialog.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {EventCardComponent} from './components/event-card/event-card.component';
import {MatCardModule} from '@angular/material/card';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {StatisticPageComponent} from './components/statistic-page/statistic-page.component';
import {MatTabsModule} from '@angular/material/tabs';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'metrics',
    component: AttributesPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tags',
    component: TagsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'events',
    component: EventsPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'statistic',
    component: StatisticPageComponent,
    canActivate: [AuthGuardService],
  },
  // TODO asem add routes here as soon as other components will be created
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    FooterComponent,
    TabsComponent,
    MainNavComponent,
    HomeComponent,
    RegistrationComponent,
    CategoriesPageComponent,
    SearchBarComponent,
    NewCategoryDialogComponent,
    AttributesPageComponent,
    NewAttributeDialogComponent,
    StringToDatePipe,
    EventsPageComponent,
    EventDialogComponent,
    ParameterComponent,
    TagsComponent,
    TagsPageComponent,
    TagDialogComponent,
    EventCardComponent,
    StatisticPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    MatAutocompleteModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    ColorPickerModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxFileDropModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCardModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
