import { categoryListTableTHeads } from "@/constants/tableHeads";
import Link from "next/link";
import { HiEye, HiTrash } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

function CategoriesTable({ categories }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
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
                  <button>
                    <HiTrash className="text-rose-600 w-6 h-6" />
                  </button>
                  <Link href={`/admin/categories/edit/${category.id}`}>
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
