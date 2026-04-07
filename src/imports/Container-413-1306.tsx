import svgPaths from "./svg-h0a6gule7j";

function Icon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_413_1242)" id="Icon">
          <path d={svgPaths.pfd5d500} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_413_1242">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[26px] relative rounded-[10px] shrink-0 w-[156.844px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[9px] py-[5px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center text-nowrap">Generate module outline</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[26px] relative rounded-[10px] shrink-0 w-[82.719px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[9px] py-[5px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center text-nowrap">Create quiz</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[26px] relative rounded-[10px] shrink-0 w-[130.234px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[9px] py-[5px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center text-nowrap">Improve description</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[26px] relative rounded-[10px] shrink-0 w-[148.453px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[9px] py-[5px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-center text-nowrap">Add learning outcomes</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[8px] h-[30px] items-center overflow-clip pl-[-95px] pr-0 py-0 relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

export default function Container1() {
  return (
    <div className="bg-[#f9fafb] relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-px pt-[8px] px-[16px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}