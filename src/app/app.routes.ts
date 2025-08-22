import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Courses } from './courses/courses';
import { Teachers } from './teachers/teachers';
import { Contact } from './contact/contact';
import { Register } from './register/register';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { Uploadcourses } from './uploadcourses/uploadcourses';
import { Uploadcdetails } from './uploadcdetails/uploadcdetails';
import { CourseDetails } from './course-details/course-details';
import { CourseDemo } from './course-demo/course-demo';
import { CoursVdUpload } from './cours-vd-upload/cours-vd-upload';

import { CouservedioListdemo } from './couservedio-listdemo/couservedio-listdemo';


export const routes: Routes = [
    {path:"", component: Home},
    {path:"home", component: Home},
    {path:"about",component: About},
    {path:"courses", component: Courses},
    {path:"teachers",component: Teachers},
      {path:"contact",component: Contact},
       {path:"register",component: Register},
        {path:"login",component: Login},
           {path:"admin",component: Admin},
              {path:"upload-courses",component: Uploadcourses},
               {path:"upload-course-details",component: Uploadcdetails},
               { path: 'course-details/:id', component: CourseDetails},
                { path: 'course-demo/:id', component: CourseDemo},
                   { path: 'course-vd-upload', component: CoursVdUpload},
                     { path: 'course-vd-list/:id', component: CouservedioListdemo},
];
