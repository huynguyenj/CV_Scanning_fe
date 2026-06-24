import { createBrowserRouter } from 'react-router'
import PageLayout from '../layout/PageLayout'
export const router = createBrowserRouter([
      {
            path: '/',
            Component: PageLayout,
            children: [
                  {
                        index: true,
                        lazy:{
                              Component: async() => (await import('../pages/CvPage')).default
                        }
                  }
            ]
      }
])