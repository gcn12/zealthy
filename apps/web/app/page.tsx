import Spacer from "@/components/Spacer";

export default function ContactSupport() {
  return (
    <div className="grid h-full place-items-center">
      <div className="bg-white  [border:1px_solid_#C6E7E7] rounded-14px py-40px px-48px">
        <h1 className="font-600 text-24px">Contact support</h1>
        <Spacer size={4} axis="y" />
        <p>We’ll get back to you within 24 hours.</p>
        <Spacer size={36} axis="y" />
        <form>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4px">
              <label className="font-600">Name</label>
              <input className="[border:1px_solid_#C6E7E7] bg-[#FBFDFD] rounded-4px px-8px py-4px" />
            </div>
            <Spacer size={24} axis="x" />
            <div className="flex flex-col gap-4px">
              <label className="font-600">Email</label>
              <input className="[border:1px_solid_#C6E7E7] bg-[#FBFDFD] rounded-4px px-8px py-4px" />
            </div>
          </div>
          <Spacer size={16} axis="y" />
          <div className="flex flex-col gap-4px">
            <label className="font-600">Subject</label>
            <input className="[border:1px_solid_#C6E7E7] bg-[#FBFDFD] rounded-4px px-8px py-4px" />
          </div>
          <Spacer size={16} axis="y" />
          <div className="flex flex-col gap-4px">
            <label className="font-600">Description of issue</label>
            <textarea className="[border:1px_solid_#C6E7E7] bg-[#FBFDFD] rounded-4px px-8px py-4px min-h-[100px]" />
          </div>
          <Spacer size={32} axis="y" />
          <button className="bg-black text-white py-8px px-16px rounded-4px font-600 text-14px">
            Send help request
          </button>
        </form>
      </div>
    </div>
  );
}
