import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SignInComponent } from './home/signin/signin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SignUpComponent } from './home/signup/signup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '', 
        pathMatch: 'full',
        redirectTo: 'home'
    },
    { 
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { 
                path: '',
                component: SignInComponent,
            }, 
            { 
                path: 'signup',
                component: SignUpComponent,
            }, 
        ]
    },   
    { 
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent 
    },
    { 
        path: '**', 
        component: NotFoundComponent 
    }  
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes, { useHash: true}) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

