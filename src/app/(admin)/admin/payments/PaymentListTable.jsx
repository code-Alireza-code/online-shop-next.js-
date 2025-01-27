import { adminPaymentListTableTHeads } from "@/constants/tableHeads";
import { toLocalDateString } from "@/utils/toLocalDate";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Link from "next/link";

function PaymentListTable({ payments }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {adminPaymentListTableTHeads.map((item) => (
              <th className="whitespace-nowrap table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td className="table__td">{toPersianNumbers(index + 1)}</td>
              <td className="table__td max-w-[200px]">
                {toPersianNumbers(payment.invoiceNumber)}
              </td>
              <td className="table__td max-w-[280px]">{payment.description}</td>
              <td className="table__td whitespace-nowrap truncate">
                <div className="flex flex-col gap-y-2">
                  <span>{payment.user.name}</span>
                  <span>{payment.user.email}</span>
                  <span className="font-bold">
                    {toPersianNumbers(payment.user.phoneNumber)}
                  </span>
                </div>
              </td>
              <td className="table__td">
                <div className="flex flex-col gap-y-2">
                  {payment.cart.productDetail.map((product) => (
                    <span className="badge badge--secondary" key={product._id}>
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="table__td font-bold text-base">
                {toPersianNumbersWithComma(payment.amount)}
              </td>
              <td className="table__td font-semibold">
                {toLocalDateString(payment.createdAt)}
              </td>
              <td className="table__td">
                {payment.status === "COMPLETED" ? (
                  <span className="badge badge--success">موفق</span>
                ) : (
                  <span className="badge badge--error">ناموفق</span>
                )}
              </td>
              <td className="table__td">
                <Link
                  href={`/admin/payments/${payment._id}`}
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

export default PaymentListTable;
