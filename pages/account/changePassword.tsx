import { ReactElement, ReactNode } from 'react'
import { GetServerSidePropsContext, NextPage } from 'next'
import UserLayout from '../../layout/userLayout'
import { authorize } from '../../utils/authorize'
import ApplicationAppBar from '../../components/application/applicationAppbar'
import ChangePasswordComponent from '../../components/account/changePassword'

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface ChangePasswordPageProps {
  user?: any
}

const ChangePasswordPage : NextPageWithLayout<ChangePasswordPageProps> = (props: ChangePasswordPageProps) => {
  return (
      <ChangePasswordComponent/>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const pageTitle = 'Change Password'
  const tokenCookie = context.req.cookies.tok

  if (!tokenCookie) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  const user:any = await authorize(tokenCookie)

  if (user.role !== 'ADMIN') {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  if (user) {
    return {
      props: {
        pageTitle,
        user
      }
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: '/login'
    }
  }
}

ChangePasswordPage.getLayout = (page: ReactElement) => {
  const dashboardAppBar = <ApplicationAppBar title={page.props.pageTitle}/>
  return (
    <UserLayout user={page.props.user} appbar={dashboardAppBar}>
      {page}
    </UserLayout>
  )
}

export default ChangePasswordPage
