import { getAllCategories } from "@/services/categoryService";
import { getAllProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";

async function ProductPage({ searchParams }) {
  const { products } = await getAllProducts(
    queryString.stringify(await searchParams)
  );
  const { categories } = await getAllCategories();

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-span-1 border rounded-xl shadow-md p-4 flex items-center"
            >
              <h2 className="font-bold">{product.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
