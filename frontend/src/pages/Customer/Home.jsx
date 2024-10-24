import React from 'react'
import CategoryList from '~/features/Category/CategoryList/CategoryList'
import CustomerLayout from '~/layouts/CustomerLayout'
import Dashboard from '~/layouts/CustomerLayout'
import ProductList from '~/features/Customer/Product/ProductList'

function CustomerHomePage() {
  return (
    <CustomerLayout>
      <ProductList/>
    </CustomerLayout>
  )
}

export default CustomerHomePage