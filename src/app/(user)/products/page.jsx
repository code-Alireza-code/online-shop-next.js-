import { getAllCategories } from "@/services/categoryService";
import { getAllProducts } from "@/services/productService";

async function ProductPage() {
  const { products } = await getAllProducts();
  const { categories } = await getAllCategories();

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <div>
          <p className="font-bold mb-4">دسته بندی ها</p>
          <ul className="col-span-1 space-y-4">
            {categories.map((category) => (
              <li key={category._id}>{category.title}</li>
            ))}
          </ul>
        </div>
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
