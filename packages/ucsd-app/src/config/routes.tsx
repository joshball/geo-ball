import { HomePage } from '../pages/HomePage'
import { MapExplorerPage } from '../pages/MapExplorerPage'
import { MapDataFilesPage } from '../pages/MapDataFilesPage'
import { RoutingPage } from '../pages/RoutingPage'

export default [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/page/map-download',
        component: MapExplorerPage
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
