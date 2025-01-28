import { couponListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCoupon } from "@/hooks/useCoupon";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toLocalDateString } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

function CouponListTable({ coupons }) {
  const { mutateAsync, isPending: isDeleting } = useRemoveCoupon();
  const [openModal, setOpenModal] = useState(false);
  const [currentCouponId, setCurrentCouponId] = useState(null);
  const queryClient = useQueryClient();

  const handleRemoveCoupon = async () => {
    setOpenModal(false);
    try {
      const { message } = await mutateAsync(currentCouponId);
      console.log(message);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-all-coupons"] });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در هنگام حذف کد تخفیف"
      );
    }
  };

  return (
    <div className="shadow-sm overflow-auto my-8">
      {openModal &&
        createPortal(
          <DeleteModal
            closeModal={() => setOpenModal(false)}
            handleDelete={handleRemoveCoupon}
            isDeleting={isDeleting}
          />,
          document.body
        )}
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
                {coupon.type === "percent" ? "%" : "تومان"}
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
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setCurrentCouponId(coupon._id);
                    }}
                  >
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

function DeleteModal({ closeModal, handleDelete, isDeleting }) {
  const ref = useOutsideClick(closeModal, "exception");
  return (
    <div>
      {/* backdrop */}
      <div className="w-full h-full absolute top-0 bg-gray-200 opacity-60 z-10"></div>
      <div className="z-20 absolute inset-0 flex items-center justify-center">
        {/* content */}
        <div
          ref={ref}
          data-id="exception"
          className="border border-gray-300 rounded-2xl bg-white flex flex-col justify-between gap-y-8 px-10 py-8"
        >
          <h1 className="font-bold text-lg">
            آیا از حذف این محصول مطمئن هستید ؟
          </h1>
          <div className="flex items-center justify-between">
            <button className="btn btn--primary px-4 py-2" onClick={closeModal}>
              خیر
            </button>
            {isDeleting ? (
              <Loading />
            ) : (
              <button
                onClick={handleDelete}
                className="btn border border-rose-400 hover:border-rose-500 px-4 py-2 text-rose-400 shadow-lg shadow-rose-100 hover:text-rose-500"
              >
                بله حذف شود
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
