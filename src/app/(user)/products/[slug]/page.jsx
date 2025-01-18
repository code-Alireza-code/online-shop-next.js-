import { getAllProducts, getProductBySlug } from "@/services/productService";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { products } = await getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

async function page({ params }) {
  const { slug } = await params;
  const { product } = await getProductBySlug(slug);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">{product.title}</h1>
      <p className="mb-6">{product.description}</p>
      <p className="mb-6">
        قیمت محصول :{" "}
        <span className={`${product.discount ? "line-through" : "font-bold"}`}>
          {" "}
          {product.price}
        </span>
      </p>
      {!!product.discount && (
        <div className="flex items-center gap-x-2 mb-6">
          <p className="text-xl font-bold">
            قیمت با تخفیف : {product.offPrice}
          </p>
          <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm flex items-center justify-center">
            {product.discount} %
          </div>
        </div>
      )}
      <div>
        <button className="btn btn--primary">اضافه کردن به سبد خرید</button>
      </div>
    </div>
  );
}

export default page;
