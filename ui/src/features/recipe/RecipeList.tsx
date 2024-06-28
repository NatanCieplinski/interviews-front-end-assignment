import { useRecipeList } from './recipe.queries'

export const RecipeList = () => {
  const { data, isLoading, isError } = useRecipeList({})

  if (isLoading) return null
  if (isError) return null
  if (!data) return null

  return (
    <div>
      {data.map((recipe) => (
        <div key={recipe.id}>{recipe.name}</div>
      ))}
    </div>
  )
}
