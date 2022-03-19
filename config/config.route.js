export default [
  {
    path: '/',
    component: '../layouts',
    routes: [
      {
        path: '/',
        redirect: '/booking',
      },
      {
        path: '/login',
        component: './login',
      },
      {
        path: '/trang-chu',
        component: './home',
      },
      // BOOKING
      {
        path: '/booking',
        component: './booking/items',
      },
      {
        path: '/booking/:id/chi-tiet',
        component: './booking/details',
      },
      // BOOKING
      // SERVICES
      {
        path: '/quan-ly-dich-vu',
        component: './services/items',
      },
      {
        path: '/quan-ly-dich-vu/them-moi',
        component: './services/add',
      },
      {
        path: '/quan-ly-dich-vu/:id/chi-tiet',
        component: './services/add',
      },
      // SERVICES
      // STAYS
      {
        path: '/quan-ly-luu-tru',
        component: './stays/items',
      },
      {
        path: '/quan-ly-luu-tru/them-moi',
        component: './stays/add',
      },
      {
        path: '/quan-ly-luu-tru/:id/chi-tiet',
        component: './stays/add',
      },
      // ATTRACTIONS
      {
        path: '/quan-ly-dia-danh-thu-hut',
        component: './attractions/items',
      },
      {
        path: '/quan-ly-dia-danh-thu-hut/them-moi',
        component: './attractions/add',
      },
      {
        path: '/quan-ly-dia-danh-thu-hut/:id/chi-tiet',
        component: './attractions/add',
      },
      // ATTRACTIONS
      // TYPE STAYS
      {
        path: '/quan-ly-loai-luu-tru',
        component: './type-stays/items',
      },
      {
        path: '/quan-ly-loai-luu-tru/them-moi',
        component: './type-stays/add',
      },
      {
        path: '/quan-ly-loai-luu-tru/:id/chi-tiet',
        component: './type-stays/add',
      },
      // TYPE STAYS
      // TYPE SERVICES
      {
        path: '/quan-ly-goi-dich-vu',
        component: './type-services/items',
      },
      {
        path: '/quan-ly-goi-dich-vu/them-moi',
        component: './type-services/add',
      },
      {
        path: '/quan-ly-goi-dich-vu/:id/chi-tiet',
        component: './type-services/add',
      },
      // TYPE SERVICES
      // TYPE ROOMS
      {
        path: '/quan-ly-loai-phong',
        component: './type-rooms/items',
      },
      {
        path: '/quan-ly-loai-phong/them-moi',
        component: './type-rooms/add',
      },
      {
        path: '/quan-ly-loai-phong/:id/chi-tiet',
        component: './type-rooms/add',
      },
      // TYPE ROOMS
      // UTILITIES
      {
        path: '/quan-ly-tien-ich',
        component: './utilities/items',
      },
      {
        path: '/quan-ly-tien-ich/them-moi',
        component: './utilities/add',
      },
      {
        path: '/quan-ly-tien-ich/:id/chi-tiet',
        component: './utilities/add',
      },
      // UTILITIES
      // CONVENIENTS
      {
        path: '/quan-ly-tien-nghi',
        component: './convenients/items',
      },
      {
        path: '/quan-ly-tien-nghi/them-moi',
        component: './convenients/add',
      },
      {
        path: '/quan-ly-tien-nghi/:id/chi-tiet',
        component: './convenients/add',
      },
      // CONVENIENTS
      // ADDITIONAL PRICES
      {
        path: '/quan-ly-tuy-chon-bo-sung',
        component: './additional-prices/items',
      },
      {
        path: '/quan-ly-tuy-chon-bo-sung/them-moi',
        component: './additional-prices/add',
      },
      {
        path: '/quan-ly-tuy-chon-bo-sung/:id/chi-tiet',
        component: './additional-prices/add',
      },
      // ADDITIONAL PRICES
      // NATIONS
      {
        path: '/quan-ly-quoc-gia',
        component: './nations/items',
      },
      {
        path: '/quan-ly-quoc-gia/them-moi',
        component: './nations/add',
      },
      {
        path: '/quan-ly-quoc-gia/:id/chi-tiet',
        component: './nations/add',
      },
      // NATIONS
      // CITIES
      {
        path: '/quan-ly-thanh-pho',
        component: './cities/items',
      },
      {
        path: '/quan-ly-thanh-pho/them-moi',
        component: './cities/add',
      },
      {
        path: '/quan-ly-thanh-pho/:id/chi-tiet',
        component: './cities/add',
      },
      // CITIES
      // HOME ITEMS
      {
        path: '/quan-ly-trang-chu',
        component: './home-items/items',
      },
      {
        path: '/quan-ly-trang-chu/them-moi',
        component: './home-items/add',
      },
      {
        path: '/quan-ly-trang-chu/:id/chi-tiet',
        component: './home-items/add',
      },
      // HOME ITEMS
      {
        path: '/tong-quan',
        component: './genarel',
      },
      {
        path: '/danh-sach-noi-luu-tru',
        component: './rooms/items',
      },
      {
        path: '/danh-sach-noi-luu-tru/tao-moi',
        component: './rooms/add',
      },
      {
        path: '/chuyen-di-cua-ban',
        component: './trips',
      },
      {
        path: '/ho-so/chinh-sua',
        component: './informations/details',
      },
      {
        path: '/ho-so/tin-tuong-va-xac-minh',
        component: './informations/trust-verify',
      },
      {
        path: '/ho-so/danh-gia-ve-ban',
        component: './informations/evaluate',
      },
      // ACCOUNT
      {
        path: '/quan-ly-nguoi-dung',
        component: './account/items',
      },
      {
        path: '/quan-ly-nguoi-dung/them-moi',
        component: './account/add',
      },
      {
        path: '/quan-ly-nguoi-dung/:id/chi-tiet',
        component: './account/add',
      },
      // ACCOUNT
      // CANCEL POLICIES
      {
        path: '/quan-ly-chinh-sach-huy',
        component: './cancel-policies/items',
      },
      {
        path: '/quan-ly-chinh-sach-huy/them-moi',
        component: './cancel-policies/add',
      },
      {
        path: '/quan-ly-chinh-sach-huy/:id/chi-tiet',
        component: './cancel-policies/add',
      },
      // CANCEL POLICIES
      {
        path: '/tin-dung-du-lich',
        component: './payment',
      },
      {
        path: '/tranh-chap',
        component: './conflict',
      },
      {
        path: '/404',
        component: './404',
      },
      {
        component: './404',
      },
    ],
  },
];
