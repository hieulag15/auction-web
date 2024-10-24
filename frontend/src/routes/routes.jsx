import AssetListPage from '~/pages/Asset/AssetListPage'
import CategoryListPage from '~/pages/Category/CategoryListPage'
import HomePage from '~/pages/Home/HomePage'
import ConfirmAccount from '~/pages/Authentication/comfirm'
import AddAssetPage from '~/pages/Asset/AddAssetPage'
import TypeListPage from '~/pages/Type/TypeListPage'
import RequirementListPage from '~/pages/Requirement/RequirementListPage'
import AddRequirementPage from '~/pages/Requirement/AddRequirementPage'
import Login from '~/pages/Authentication/Login'
import Register from '~/pages/Authentication/Register'
import CustomerHomePage from '~/pages/customer/Home'
import ProductListPage from '~/pages/customer/ProductListPage'
import ProductDetailPage from '~/pages/customer/ProductDetailPage';

const BASE_PATHS = {
  HOME: '/',
  CATEGORY: '/category',
  ASSET: '/asset',
  REQUIREMENT: '/requirement',
  CONFIRM_ACCOUNT: '/confirm-account',
  CUSTOMER: '/customer'
}

export const routes = [
  {
    path: `${BASE_PATHS.CATEGORY}`,
    page: CategoryListPage
  },
  {
    path: `${BASE_PATHS.CUSTOMER}-asset`,
    page: ProductListPage,
  },
  {
    path: `/:productSlug`, 
    page: ProductDetailPage,
  },
  {
    path: `${BASE_PATHS.CATEGORY}/type`,
    page: TypeListPage
  },
  {
    path: `${BASE_PATHS.ASSET}`,
    page: AssetListPage
  },
  {
    path: `${BASE_PATHS.ASSET}/create`,
    page: AddAssetPage
  },
  {
    path: `${BASE_PATHS.REQUIREMENT}`,
    page: RequirementListPage
  },
  {
    path: `${BASE_PATHS.REQUIREMENT}/create`,
    page: AddRequirementPage
  },
  {
    path: BASE_PATHS.HOME,
    page: HomePage
  },
  {
    path: BASE_PATHS.CONFIRM_ACCOUNT,
    page: ConfirmAccount
  },
  {
    path: '/login',
    page: Login
  },
  {
    path: '/register',
    page: Register
  },
  {
    path: `${BASE_PATHS.CUSTOMER}`,
    page: CustomerHomePage
  },
]