export const APP_NAME = 'moko'

export const EXTERNAL_LINKS = {
  INSTAGRAM: 'https://www.instagram.com/mokocollections.eg/',
}

// Define the links and their paths
export const dashboradRoutes = [
  // { 
  //     name: 'home', 
  //     path: '',
  // },
  { 
    name: 'orders', 
    path: '/orders',
  },
  {
    name: 'inventory',
    path: '/products/inventory'
  },
  // {
  //     name: 'products', 
  //     path: '/products',
  //     nestedLinks: [
  //         // {
  //         //     name: 'collections',
  //         //     path: 'collections',
  //         // },
  //         {
  //             name: 'inventory',
  //             path: 'inventory',
  //         },
  //         // {
  //         //     name: 'purchase orders',
  //         //     path: 'purchase-orders',
  //         // },
  //     ],
  // },
  // { 
  //     name: 'customers', 
  //     path: 'customers',
  // },
  // { 
  //     name: 'analytics', 
  //     path: 'analytics',
  // },
  // { 
  //     name: 'discounts', 
  //     path: 'discounts',
  // },
  // { 
  //     name: 'themes', 
  //     path: 'themes',
  // },
  {
    name: 'shipping and delivery',
    path: '/shipping'
  }
]