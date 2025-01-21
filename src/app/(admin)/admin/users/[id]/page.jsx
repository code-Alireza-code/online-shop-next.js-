"use client";

import { useParams } from "next/navigation";

function page() {
  const params = useParams();
  const { id } = params;
  console.log(id);

  return <div>user detail page</div>;
}

export default page;
