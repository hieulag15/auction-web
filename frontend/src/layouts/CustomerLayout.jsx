import React from 'react'
import Header from '~/components/DefautComponent/HeaderComponent/Header'
import Footer from '~/components/DefautComponent/FooterComponent/Footer'
import { Box } from '@mui/material'
import Sidenav from '~/components/DefautComponent/SidenavComponent/Sidenav'
import CategoryBar from '~/components/DefautComponent/HeaderComponent/CategoryBar'

function CustomerLayout({ children }) {
  return (
<>

<Header />
<CategoryBar/>
{children}
<Footer/>
</>
 

  )
}

export default CustomerLayout