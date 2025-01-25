import { productListTableTHeads } from "@/constants/tableHeads";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Link from "next/link";
import { HiEye, HiTrash } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

function ProductListTable({ products }) {
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
              <td className="table__td">{index + 1}</td>
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
              <td className="table__td font-bold underline flex justify-center">
                <div className="flex items-center gap-x-3">
                  <Link href={`/admin/products/${product._id}`}>
                    <HiEye className="text-primary-900 w-6 h-6" />
                  </Link>
                  <button>
                    <HiTrash className="text-rose-500 w-6 h-6" />
                  </button>
                  <button>
                    <Link href={`/admin/products/edit/${product._id}`}>
                      <MdEdit className="text-secondary-600 w-6 h-6" />
                    </Link>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListTable;
