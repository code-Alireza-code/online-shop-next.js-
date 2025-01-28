import Loading from "@/common/Loading";
import DeleteModal from "@/components/DeleteModal";
import { productListTableTHeads } from "@/constants/tableHeads";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useRemoveProduct } from "@/hooks/useProducts";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { HiEye, HiTrash } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

function ProductListTable({ products }) {
  const [openModal, setOpenModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending: isDeleting } = useRemoveProduct();

  const handleRemoveProduct = async () => {
    setOpenModal(false);
    try {
      const { message } = await mutateAsync(currentProductId);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در هنگام حذف محصول");
    }
  };

  return (
    <div className="shadow-sm overflow-auto my-8">
      {openModal &&
        createPortal(
          <DeleteModal
            closeModal={() => setOpenModal(false)}
            handleDelete={handleRemoveProduct}
            isDeleting={isDeleting}
            label="محصول"
          />,
          document.body
        )}
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
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setCurrentProductId(product._id);
                    }}
                  >
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
