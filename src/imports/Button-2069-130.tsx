import svgPaths from "./svg-mt95a8nkuk";

function Icon() {
  return (
    <div className="absolute left-[221.98px] size-[16px] top-[15px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-white border border-[#e5e7eb] border-solid relative rounded-[10px] size-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[144.36px] not-italic text-[#101828] text-[14px] text-center top-[13px] tracking-[-0.1504px]">Meet the community</p>
      <Icon />
    </div>
  );
}