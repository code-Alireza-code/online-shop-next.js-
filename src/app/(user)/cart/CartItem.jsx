import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

function CartItem({ product }) {
  console.log(product.discount);

  return (
    <div className="border rounded-xl p-4 flex justify-between">
      <span className="flex-1 font-bold">{product.title}</span>
      <div className="ml-3 flex items-center gap-x-3 border-l-2 pl-4">
        <span>قیمت :</span>
        {product.discount > 0 && (
          <>
            <span className="font-bold">{product.offPrice}</span>
            <div className=" text-white rounded-2xl px-2 py-1 flex items-center justify-center bg-red-500">
              %{product.discount}
            </div>
          </>
        )}
        <span
          className={` ${
            product.discount > 0 ? "line-through text-gray-600" : "font-bold"
          }`}
        >
          {product.price}
        </span>
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <span className=" border-l-2 pl-4">تعداد : {product.quantity}</span>
        <div className="flex gap-x-2">
          <button className="bg-primary-900 text-white rounded p-1">
            <HiPlus className="w-4 h-4" />
          </button>
          <button>
            <HiOutlineTrash className="w-5 h-5 text-rose-500" />
          </button>
          <button className="border-2 text-gray-600 border-gray-300 rounded ">
            <HiMinus className="w-5 h-5 " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
