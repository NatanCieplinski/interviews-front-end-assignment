import { Navigate, createBrowserRouter } from 'react-router-dom'
import { RecipeList } from '../features/recipe/RecipeList'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="list" replace />,
  },
  {
    path: 'list',
    element: <RecipeList />,
  },
])
