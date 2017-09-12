import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { RecipeService } from './../recipes/recipe.service';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { AuthInterceptor } from './../shared/auth.interceptor';
import { LoggingInterceptor } from './../shared/logging.interceptor';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    providers: [
        ShoppingListService, 
        RecipeService, 
        DataStorageService, 
        AuthService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ]
})
export class CoreModule {}
