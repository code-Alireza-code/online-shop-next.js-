import { userPaymentTHeads } from "@/constants/tableHeads";
import { toLocalDateString } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";

function PaymentTable({ payments }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {userPaymentTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment, index) => (
            <tr key={payment._id}>
              <td className="table__td">{index + 1}</td>
              <td className="table__td">{payment.invoiceNumber}</td>
              <td className="table__td max-w-[350px] whitespace-nowrap overflow-x-auto">
                {payment.description}
              </td>
              <td className="table__td flex flex-col gap-y-2">
                {payment.cart.productDetail.map((product) => (
                  <div
                    key={product._id}
                    className="whitespace-nowrap px-2 text-white py-0.5 rounded-xl bg-secondary-600"
                  >
                    {product.title}
                  </div>
                ))}
              </td>
              <td className="table__td">
                {toPersianNumbersWithComma(payment.amount)}
              </td>
              <td className="table__td">
                {toLocalDateString(payment.createdAt)}
              </td>
              <td className="table__td">
                {payment.status === "COMPLETED" ? (
                  <span className="badge badge--success">موفق</span>
                ) : (
                  <span className="badge badge--error">ناموفق</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;
