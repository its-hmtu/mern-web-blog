import MainLayout from "layouts/MainLayout";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import RegisterPage from "pages/RegisterPage";

export function RouteList(){
  return [
   {
    element: <MainLayout />,
    children: [
     { 
      path: '/',
      element: <HomePage />
     },
    ]
   }, 
   {
    path: '/signin',
    element: <SignInPage />
   },
   {
    path: '/register',
    element: <RegisterPage />
   }
  ]
}