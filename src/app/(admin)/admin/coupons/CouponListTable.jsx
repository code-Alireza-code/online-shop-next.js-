import { couponListTableTHeads } from "@/constants/tableHeads";
import { toLocalDateString } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import Link from "next/link";
import { HiTrash } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

function CouponListTable({ coupons }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {couponListTableTHeads.map((item) => (
              <th className="whitespace-nowrap table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon._id}>
              <td className="table__td">{index + 1}</td>
              <td className="table__td whitespace-nowrap font-bold">
                {coupon.code}
              </td>
              <td className="table__td">
                <span className="badge badge--primary">{coupon.type}</span>
              </td>
              <td className="table__td">
                {toPersianNumbersWithComma(coupon.amount)}
              </td>
              <td className="table__td">
                <div className="flex flex-col gap-y-1 max-h-[100px] overflow-y-auto">
                  {coupon.productIds.map((p) => (
                    <span key={p._id} className="badge badge--secondary">
                      {p.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="table__td">
                {toPersianNumbersWithComma(coupon.usageCount)}
              </td>
              <td className="table__td">
                {toPersianNumbersWithComma(coupon.usageLimit)}
              </td>
              <td className="table__td">
                {toLocalDateString(coupon.expireDate)}
              </td>
              <td className="table__td font-bold underline">
                <div className="flex justify-center items-center gap-x-3">
                  <button>
                    <HiTrash className="text-rose-500 w-6 h-6" />
                  </button>
                  <button>
                    <Link href={`/admin/coupons/edit/${coupon._id}`}>
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

export default CouponListTable;
