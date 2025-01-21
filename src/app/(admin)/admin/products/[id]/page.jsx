"use client";

import { useParams } from "next/navigation";

function ProductDetailPage() {
  const params = useParams();
  const { id } = params;

  return <div>product detail page</div>;
}

export default ProductDetailPage;
