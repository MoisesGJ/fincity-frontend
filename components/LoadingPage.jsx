export default function Loading() {
  return (
    <div className="transition ease-in-out delay-150 fixed z-50 inset-0 backdrop-blur-sm bg-white/30 gap-x-2 flex justify-center items-center">
      <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
      <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
      <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
    </div>
  );
}
