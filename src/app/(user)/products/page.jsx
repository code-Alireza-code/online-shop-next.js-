import { getAllCategories } from "@/services/categoryService";
import { getAllProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import { toLocalDateString } from "@/utils/toLocalDate";
import Link from "next/link";
import AddToCart from "./[slug]/AddToCart";

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
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-span-1 border rounded-xl shadow-md p-4 space-y-6"
              >
                <h2 className="font-bold text-xl mb-4">{product.title}</h2>
                <div className="mb-4">
                  <span>تاریخ ساخت : </span>
                  <span className="font-bold">
                    {toLocalDateString(product.createdAt)}
                  </span>
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="font-bold text-primary-900"
                >
                  مشاهده محصول
                </Link>
                <AddToCart product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
