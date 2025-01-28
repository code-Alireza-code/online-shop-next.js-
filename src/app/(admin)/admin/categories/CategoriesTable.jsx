import Loading from "@/common/Loading";
import DeleteModal from "@/components/DeleteModal";
import { categoryListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCategory } from "@/hooks/useCategories";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { HiEye, HiTrash } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

function CategoriesTable({ categories }) {
  const [openModal, setOpenModal] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const { mutateAsync, isPending } = useRemoveCategory();
  const queryClient = useQueryClient();

  const handleDeleteCategory = async () => {
    setOpenModal(false);
    try {
      const { message } = await mutateAsync(currentCategoryId);
      queryClient.invalidateQueries({ queryKey: ["get-all-categories"] });
      toast.success(message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در هنگام حذف دسته بندی"
      );
    }
  };

  return (
    <div className="shadow-sm overflow-auto my-8">
      {openModal &&
        createPortal(
          <DeleteModal
            closeModal={() => setOpenModal(false)}
            handleDelete={handleDeleteCategory}
            isDeleting={isPending}
            label="دسته بندی"
          />,
          document.body
        )}
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {categoryListTableTHeads.map((item) => (
              <th className="whitespace-nowrap table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td className="table__td">{index + 1}</td>
              <td className="table__td whitespace-nowrap font-bold">
                {category.title}
              </td>
              <td className="table__td max-w-[200px] break-words">
                {category.description}
              </td>
              <td className="table__td">{category.englishTitle}</td>
              <td className="table__td">
                <span className="badge badge--primary">{category.type}</span>
              </td>
              <td className="table__td font-bold">
                <div className="flex justify-center items-center gap-x-4">
                  <Link href={`/admin/categories/${category._id}`}>
                    <HiEye className="text-primary-900 w-6 h-6" />
                  </Link>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setCurrentCategoryId(category._id);
                    }}
                  >
                    <HiTrash className="text-rose-600 w-6 h-6" />
                  </button>
                  <Link href={`/admin/categories/edit/${category._id}`}>
                    <MdEdit className="w-6 h-6 text-secondary-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesTable;
