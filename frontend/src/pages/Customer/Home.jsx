import React from 'react'
import CategoryList from '~/features/Category/CategoryList/CategoryList'
import CustomerLayout from '~/layouts/CustomerLayout'
import Dashboard from '~/layouts/CustomerLayout'
import ProductList from '~/features/Customer/Product/ProductList'
import Banner from '~/components/DefautComponent/BannerComponent/BannerComponent'
import AuctionedProductList from '~/features/Customer/AuctionedProduct/AuctionedProductList'

function CustomerHomePage() {
  return (
    <CustomerLayout>
      <Banner/>
      <AuctionedProductList/>
    </CustomerLayout>
  )
}

export default CustomerHomePage