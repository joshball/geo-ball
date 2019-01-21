import { HomePage } from '../pages/HomePage'
import { MapDownloadPage } from '../pages/MapDownloadPage'
import { MapDataFilesPage } from '../pages/MapDataFilesPage'
import { RoutingPage } from '../pages/RoutingPage'

export default [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/page/map-download',
        component: MapDownloadPage
    },
    {
        path: '/page/map-data-files',
        component: MapDataFilesPage
    },
    {
        path: '/page/routing',
        component: RoutingPage
    },
]
