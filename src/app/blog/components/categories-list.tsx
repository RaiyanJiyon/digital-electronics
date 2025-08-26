import type React from "react"

interface Category {
  name: string
  slug: string
}

interface CategoriesListProps {
  categories?: Category[]
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories = [
    { name: "Projects", slug: "projects" },
    { name: "Events", slug: "events" },
    { name: "Search Parts", slug: "search-parts" },
    { name: "eCommerce", slug: "ecommerce" },
    { name: "Marketing Tech", slug: "marketing-tech" },
  ],
}) => {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-red-500 text-white text-sm font-bold py-3 px-4">CATEGORIES</div>
      <div className="p-4">
        <ul className="divide-y divide-gray-200 border border-gray-200 px-4">
          {categories.map(category => (
            <li key={category.slug}>
              <div
                className="block py-3 text-sm text-gray-800 hover:text-red-500 transition-colors"
              >
                {category.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CategoriesList

