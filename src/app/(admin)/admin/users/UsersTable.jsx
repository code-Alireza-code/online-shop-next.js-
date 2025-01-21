import { userListTableHeads } from "@/constants/tableHeads";
import { toLocalDateString } from "@/utils/toLocalDate";
import Link from "next/link";
import { HiCheck } from "react-icons/hi";

function UsersTable({ users }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {userListTableHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td className="table__td">{index + 1}</td>
              <td className="table__td">{user.name}</td>
              <td className="table__td ">{user.email}</td>
              <td className="table__td">
                <div className="flex  gap-x-1">
                  {user.phoneNumber}
                  {user.isVerifiedPhoneNumber && (
                    <HiCheck className="w-5 h-5 text-white bg-success rounded-full" />
                  )}
                </div>
              </td>
              <td className="table__td">
                <div className="flex flex-col gap-y-2 items-start max-h-[120px] overflow-y-auto">
                  {!user.Products.length && "-----"}
                  {user.Products.map((product, index) => (
                    <span key={index} className="badge badge--secondary">
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>

              <td className="table__td">{toLocalDateString(user.createdAt)}</td>
              <td className="table__td ">
                <Link
                  href={`/admin/users/${user._id}`}
                  className="font-bold underline"
                >
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

export default UsersTable;
