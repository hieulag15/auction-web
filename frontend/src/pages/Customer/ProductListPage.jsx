import React from 'react'
import CategoryList from '~/features/Category/CategoryList/CategoryList'
import CustomerLayout from '~/layouts/CustomerLayout'
import Dashboard from '~/layouts/CustomerLayout'
import ProductList from '~/features/Customer/Product/ProductList'
import Banner from '~/components/DefautComponent/BannerComponent/BannerComponent'

function ProductListPage() {
  return (
    <CustomerLayout>

      <ProductList/>
    </CustomerLayout>
  )
}

export default ProductListPage