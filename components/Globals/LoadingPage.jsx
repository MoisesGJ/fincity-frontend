export default function Loading({ student }) {
  return (
    <div className="transition ease-in-out delay-150 fixed z-50 inset-0 backdrop-blur-sm bg-white/30 gap-x-2 flex justify-center items-center">
      <div
        className={`w-5 ${
          student ? 'bg-[#ffdea5]' : 'bg-[#d991c2]'
        } h-5 rounded-full animate-bounce`}
      ></div>
      <div
        className={`w-5 h-5 ${
          student ? 'bg-[#ffa132]' : 'bg-[#9869b8]'
        } rounded-full animate-bounce`}
      ></div>
      <div
        className={`w-5 h-5 ${
          student ? 'bg-[#FD6A00]' : 'bg-[#6756cc]'
        } rounded-full animate-bounce`}
      ></div>
    </div>
  );
}
