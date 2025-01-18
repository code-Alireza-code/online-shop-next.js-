import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

function CartItem({ product }) {
  return (
    <div className="border rounded-xl p-4 flex justify-between">
      <span className="flex-1 font-bold">{product.title}</span>
      <div className="flex items-center justify-between gap-x-8">
        <span>تعداد : {product.quantity}</span>
        <div className="flex gap-x-2">
          <button className="bg-primary-900 text-white rounded p-1">
            <HiPlus className="w-4 h-4" />
          </button>
          <button>
            <HiOutlineTrash className="w-5 h-5 text-rose-500" />
          </button>
          <button className="border-2 text-primary-900 border-primary-900 rounded ">
            <HiMinus className="w-5 h-5 " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
