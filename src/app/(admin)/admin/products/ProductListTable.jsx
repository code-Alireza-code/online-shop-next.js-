import { productListTableTHeads } from "@/constants/tableHeads";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Link from "next/link";

function ProductListTable({ products }) {
  console.log(products);

  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {productListTableTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={product._id}>
              <td className="table__td">{index}</td>
              <td className="table__td ">{toPersianNumbers(product.title)}</td>
              <td className="table__td">{product.category.title}</td>
              <td className="table__td">
                {toPersianNumbersWithComma(product.price)}
              </td>
              <td className="table__td">
                {toPersianNumbersWithComma(product.discount)}%
              </td>
              <td className="table__td ">
                {toPersianNumbersWithComma(product.offPrice)}
              </td>
              <td className="table__td">
                {toPersianNumbers(product.countInStock)}
              </td>
              <td className="table__td font-bold underline">
                <Link href={`/admin/products/${product._id}`}>
                  مشاهده جزییات
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListTable;
