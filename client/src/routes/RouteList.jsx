import MainLayout from "layouts/MainLayout";
import HomePage from "pages/HomePage";

export function RouteList(){
  return [
   {
    element: <MainLayout />,
    children: [
     { 
      path: '/',
      element: <HomePage />
     }
    ]
   }
  ]
}