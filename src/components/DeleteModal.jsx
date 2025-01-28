import Loading from "@/common/Loading";
import useOutsideClick from "@/hooks/useOutsideClick";

function DeleteModal({ closeModal, handleDelete, isDeleting, label }) {
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
            آیا از حذف این {label} مطمئن هستید ؟
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

export default DeleteModal;
