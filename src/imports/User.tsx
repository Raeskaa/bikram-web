import svgPaths from "./svg-6k31gy3hds";
import { imgGroup, imgGroup1, imgGroup2, imgGroup3, imgGroup4, imgGroup5, imgGroup6, imgGroup7 } from "./svg-fmyh6";

function Container() {
  return <div className="absolute h-[1732px] left-0 top-[106px] w-[2186px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[19px] items-start left-[19px] top-[7px] w-[721.563px]" data-name="Paragraph">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.5px] whitespace-pre">Leaper V2.1 available, You can now create automations around for events to better organize, manage, train and execute</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[14.262px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[4.8%] left-0 right-[5.75%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14">
          <path d={svgPaths.pb4aa120} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.62046" />
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-[15.391px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute left-[2151.61px] size-[15.391px] top-[8.8px]" data-name="Button">
      <div className="absolute flex items-center justify-center left-[-3.19px] size-[21.766px] top-[-3.2px]" style={{ "--transform-inner-width": "15.390625", "--transform-inner-height": "15.390625" } as React.CSSProperties}>
        <div className="flex-none rotate-[45deg]">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className="absolute bg-[#420d74] h-[33px] left-0 top-0 w-[2186px]" data-name="Banner">
      <Paragraph />
      <Button />
    </div>
  );
}

function Logoicon() {
  return (
    <div className="[grid-area:1_/_1] h-[39.063px] ml-0 mt-0 relative w-[98px]" data-name="Logoicon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 40">
        <g id="Logoicon">
          <path d={svgPaths.pf3dd700} fill="var(--fill-0, #420D74)" id="Vector" />
          <path d={svgPaths.p11dd600} fill="var(--fill-0, #420D74)" id="Vector_2" />
          <path d={svgPaths.peee9400} fill="var(--fill-0, #420D74)" id="Vector_3" />
          <path d={svgPaths.pc379280} fill="var(--fill-0, #420D74)" id="Vector_4" />
          <path d={svgPaths.p9fbee80} fill="var(--fill-0, #420D74)" id="Vector_5" />
          <path d={svgPaths.p3751f400} fill="var(--fill-0, #420D74)" id="Vector_6" />
          <path d={svgPaths.p28aba770} fill="var(--fill-0, #420D74)" id="Vector_7" />
          <path d={svgPaths.p26e81c00} fill="var(--fill-0, #420D74)" id="Vector_8" />
          <path d={svgPaths.p927f200} fill="var(--fill-0, #19BC7A)" id="Vector_9" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Logoicon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start relative shrink-0 w-[142px]" data-name="Frame">
      <Icon1 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-gray-50 h-[36px] left-0 rounded-[8px] top-0 w-[256px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip pl-[36px] pr-[64px] py-[4px] relative rounded-[inherit] w-[256px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Search...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[8px] size-[10px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_67_2357)" id="Icon">
          <path d={svgPaths.p3d54d900} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_67_2357">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Kbd() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[22px] left-[204.77px] rounded-[4px] top-[7px] w-[39.234px]" data-name="Kbd">
      <Icon3 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[22px] not-italic text-[12px] text-neutral-950 text-nowrap top-[3px] whitespace-pre">K</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[36px] relative shrink-0 w-[256px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[256px]">
        <Input />
        <Icon2 />
        <Kbd />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_67_2351)" id="Icon">
          <path d={svgPaths.p3a6156f0} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3a1f4700} id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 4H5.33333V6.66667" id="Vector_3" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e22bc00} id="Vector_4" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_67_2351">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[2px] w-[16.953px]" data-name="Text">
      <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[20px] relative shrink-0 text-[14px] text-nowrap text-zinc-700 whitespace-pre">33</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[20.95px] top-[2px] w-[3.922px]" data-name="Text">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#9f9fa9] text-[14px] text-nowrap whitespace-pre">/</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[28.88px] top-[2px] w-[16.656px]" data-name="Text">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#71717b] text-[14px] text-nowrap whitespace-pre">45</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <Text />
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[9.922px]">
        <p className="absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[24px] left-0 text-[#420d74] text-[16px] text-nowrap top-[-1px] whitespace-pre">+</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-gray-50 h-[38px] relative rounded-[8px] shrink-0 w-[109px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[38px] items-center px-[13px] py-px relative w-[109px]">
        <Icon4 />
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.56%_12.56%_12.5%_12.49%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p11067680} id="Vector" stroke="var(--stroke-0, #71717B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute inset-[12.14%_80.25%_82.57%_14.48%] mask-position-[0px,_0px] mask-size-[1.475px_1.429px,_1.475px_1.429px]" data-name="Group" style={{ maskImage: `url('${imgGroup}'), url('${imgGroup1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
        <g id="Group">
          <path d="M0 0H1.47541V1.42864H0V0Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[12.14%_80.25%_82.57%_14.48%]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[12.14%_80.25%_82.57%_14.48%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[12.14%_80.25%_82.57%_14.48%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute inset-[12.15%_14.47%_82.56%_80.26%] mask-position-[-0.001px,_0px_0px,_0px] mask-size-[1.477px_1.429px,_1.477px_1.429px]" data-name="Group" style={{ maskImage: `url('${imgGroup2}'), url('${imgGroup3}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
        <g id="Group">
          <path d="M0 0H1.47705V1.42864H0V0Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-[12.15%_14.47%_82.56%_80.26%]" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[12.15%_14.47%_82.56%_80.26%]" data-name="Group">
      <ClipPathGroup2 />
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-[12.14%_14.47%_82.56%_80.26%]" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="absolute h-[27px] left-[3.84px] top-[14px] w-[28px]" data-name="Logo_icon">
      <div className="absolute inset-[5.73%_10.11%_14.24%_10.1%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 22">
          <path d={svgPaths.p3c9e3500} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[25.43%] left-0 right-[75.59%] top-[50.08%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
          <path d={svgPaths.pf9b6728} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[25.43%] left-[75.58%] right-0 top-[50.08%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
          <path d={svgPaths.p1c954700} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-[7.22%] right-[64.34%] top-[71.47%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path d={svgPaths.p26acc00} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-[64.34%] right-[7.23%] top-[71.47%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path d={svgPaths.p9413270} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[34.27%_11.42%_12.56%_11.41%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 15">
          <path d={svgPaths.p3a387780} fill="var(--fill-0, #F7FFDD)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.75%] left-[0.14%] right-[65.72%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <path d={svgPaths.p19560900} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[10.58%_76.27%_76.33%_10.68%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <path d={svgPaths.p1ce8b000} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[12.52%_80.89%_85.36%_15.32%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 1">
          <path d={svgPaths.p11766580} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.75%] left-[65.72%] right-[0.14%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <path d={svgPaths.p1e678e80} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[10.58%_10.69%_76.33%_76.26%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <path d={svgPaths.p2ee75b00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[12.52%_15.32%_85.36%_80.89%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 1">
          <path d={svgPaths.p18f31200} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[18.28%_40.14%_70.14%_40.14%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 4">
          <path d={svgPaths.p1e6ef000} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup1 />
      <ClipPathGroup3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white relative rounded-[1000px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative rounded-[inherit] size-[36px]">
        <LogoIcon />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2e2e2] border-solid inset-0 pointer-events-none rounded-[1000px]" />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#420d74] h-[36px] relative rounded-[6px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 w-[75.844px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] relative w-[75.844px]">
        <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Sign-in</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[12px] h-[38px] items-center relative shrink-0" data-name="Container">
      <Container2 />
      <Container3 />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame />
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Container">
      <Frame12 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[73px] items-start left-1/2 pb-px pt-[16px] px-[24px] top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[2186px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Container5 />
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute bg-white border-[0px_0px_1px] border-gray-200 border-solid h-[73px] left-0 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[33px] w-[2186px]" data-name="Header">
      <Header />
    </div>
  );
}

function V() {
  return (
    <div className="absolute bg-gradient-to-r from-[#f4f4f4] h-[1269px] left-0 overflow-clip to-[#f4f4f4] top-0 w-[2186px]" data-name="v4" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 2186 1269\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -179.46 -309.15 0 0 0)\\'><stop stop-color=\\'rgba(66,13,116,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 2186 1269\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -179.46 -309.15 0 2186 0)\\'><stop stop-color=\\'rgba(147,51,234,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 2186 1269\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -179.46 -309.15 0 2186 1269)\\'><stop stop-color=\\'rgba(236,72,153,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }}>
      <Container />
      <Banner />
      <Header1 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[16px] size-[15px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d="M3.125 7.5H11.875" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M7.5 3.125V11.875" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-[#420d74] h-[32px] left-[16px] rounded-[6px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] top-[16px] w-[47px]" data-name="Primitive.button">
      <Icon6 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pb56cd00} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p33f0e580} id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-gray-100 content-stretch flex h-[38px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon7 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_67_2327)" id="Icon">
          <path d={svgPaths.p2f48f580} id="Vector" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3dc49580} id="Vector_2" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_67_2327">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_67_2301)" id="Icon">
          <path d={svgPaths.p312a3e80} id="Vector" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M15 1.5V4.5" id="Vector_2" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M16.5 3H13.5" id="Vector_3" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p6f9ce00} id="Vector_4" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_67_2301">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M9 1.5V16.5" id="Vector" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3818ef00} id="Vector_2" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[164px] items-start relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="h-[602px] relative shrink-0 w-full" data-name="Navigation">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[602px] items-start pb-0 pt-[8px] px-[12px] relative w-full">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_67_2366)" id="Icon">
          <path d={svgPaths.p19792100} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1e422200} id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5.25 4.5H6V7.5" id="Vector_3" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p15da1198} id="Vector_4" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_67_2366">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex h-[34px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon11 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p1c2bc200} id="Vector" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p254f3200} id="Vector_2" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon12 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_67_2286)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p15dd56c0} id="Vector_2" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 12.75H9.0075" id="Vector_3" stroke="var(--stroke-0, #3F3F46)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_67_2286">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex h-[38px] items-center justify-center relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon13 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[80px] items-start relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[163px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[163px] items-start pb-0 pt-[17px] px-[12px] relative w-full">
          <Button8 />
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1099px] items-start justify-between left-0 top-[64px] w-[79px]">
      <Navigation />
      <Container8 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white border-[0px_1px_0px_0px] border-gray-200 border-solid h-[1163px] left-0 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[106px] w-[80px]" data-name="Sidebar">
      <PrimitiveButton />
      <Frame3 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon14 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[75px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Community</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[4.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[4.125px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">/</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Spaces /</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[153px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-[153px]">
        <Text5 />
        <Text6 />
        <Text7 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.pc94000} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p9812d80} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2ad810a0} id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] top-0 w-[70px]">Saved 14:42</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[16px] relative shrink-0 w-[89.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16px] items-center relative w-[89.734px]">
        <Icon15 />
        <Text8 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] items-center relative">
        <Button11 />
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p35d87a00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p8e60940} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative rounded-bl-[8px] rounded-tl-[8px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-tl-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-px py-0 relative size-[32px]">
        <Icon16 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p34a07880} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3bed4700} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-br-[8px] rounded-tr-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <Icon17 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[34px] relative rounded-[10px] shrink-0 w-[66px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[34px] items-center p-px relative w-[66px]">
        <Button12 />
        <Button13 />
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[104.094px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[104.094px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-neutral-950 text-nowrap top-[6px] tracking-[-0.1504px] whitespace-pre">Build</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p26470880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#420d74] h-[32px] relative rounded-[8px] shrink-0 w-[104.094px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[104.094px]">
        <Icon18 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-nowrap text-white top-[6px] tracking-[-0.1504px] whitespace-pre">Preview</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 10V2" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p23ad1400} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p19411800} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[95.344px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[95.344px]">
        <Icon19 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-neutral-950 text-nowrap top-[6px] tracking-[-0.1504px] whitespace-pre">Export</p>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p185fb780} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p30ca5e80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pac25b80} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2af72700} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p31befa00} id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[90.219px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[90.219px]">
        <Icon20 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-neutral-950 text-nowrap top-[6px] tracking-[-0.1504px] whitespace-pre">Share</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-[rgba(66,13,116,0.37)] h-[32px] relative rounded-[8px] shrink-0 w-[142px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-[142px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">Publish Community</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[34px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[34px] items-center relative">
        <Container12 />
        <Button14 />
        <Button15 />
        <Button16 />
        <Button17 />
        <Button18 />
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="bg-white h-[59px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[59px] items-center justify-between pb-px pt-0 px-[16px] relative w-full">
          <Container11 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3a151200} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18af2500} id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.242px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[38.242px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[19.5px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-gray-100 h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon21 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[22px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Events</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#eceef2] h-[22px] relative rounded-[8px] shrink-0 w-[25.695px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[25.695px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-center text-nowrap whitespace-pre">3</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[38px] items-center px-[12px] py-0 relative w-full">
          <Icon22 />
          <Text10 />
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3baa1080} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[60.484px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[30px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Members</p>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center pl-[12px] pr-0 py-0 relative w-full">
          <Icon23 />
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Navigation1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[158px] items-start relative shrink-0 w-full" data-name="Navigation">
      <Button19 />
      <Button20 />
      <Button21 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[137px] relative shrink-0 w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[137px] items-start pb-px pt-[12px] px-[12px] relative w-[255px]">
        <Navigation1 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[67.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[67.406px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[34px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px tracking-[0.3px] translate-x-[-50%] uppercase whitespace-pre">Channels</p>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[24px] items-center justify-between px-[8px] py-0 relative w-full">
          <Text12 />
          <Icon24 />
        </div>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1ce3c700} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1a06de00} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Announcements</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#eceef2] h-[20px] relative rounded-[8px] shrink-0 w-[21.406px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[21.406px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-center text-nowrap whitespace-pre">2</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button23() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <Icon25 />
          <Text13 />
          <Badge1 />
        </div>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 6H13.3333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 2L5.33333 14" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 2L9.33333 14" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">General</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#eceef2] h-[20px] relative rounded-[8px] shrink-0 w-[21.602px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[21.602px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-center text-nowrap whitespace-pre">5</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button24() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <Icon26 />
          <Text14 />
          <Badge2 />
        </div>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b6ee540} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Introductions</p>
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <Icon27 />
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_67_2193)" id="Icon">
          <path d={svgPaths.p3685cc80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13a75f00} fill="var(--fill-0, #4A5565)" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3359640} fill="var(--fill-0, #4A5565)" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e291080} fill="var(--fill-0, #4A5565)" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2041a800} fill="var(--fill-0, #4A5565)" id="Vector_5" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_67_2193">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Design Feedback</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#eceef2] h-[20px] relative rounded-[8px] shrink-0 w-[21.695px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[21.695px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-center text-nowrap whitespace-pre">3</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button26() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <Icon28 />
          <Text16 />
          <Badge3 />
        </div>
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Resources</p>
      </div>
    </div>
  );
}

function Button27() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <Icon29 />
          <Text17 />
        </div>
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_67_2187)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p30be9df0} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6 6H6.00667" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 6H10.0067" id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_67_2187">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Random</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#eceef2] h-[20px] relative rounded-[8px] shrink-0 w-[19.766px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center justify-center overflow-clip px-[7px] py-px relative rounded-[inherit] w-[19.766px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-center text-nowrap whitespace-pre">1</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button28() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center px-[8px] py-0 relative w-full">
          <Icon30 />
          <Text18 />
          <Badge4 />
        </div>
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[82.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[82.367px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[41px] not-italic text-[#99a1af] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Add Channel</p>
      </div>
    </div>
  );
}

function Button29() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[32px] items-center pl-[8px] pr-0 py-0 relative w-full">
          <Icon31 />
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] h-[236px] items-start relative shrink-0 w-full" data-name="Container">
      <Button23 />
      <Button24 />
      <Button25 />
      <Button26 />
      <Button27 />
      <Button28 />
      <Button29 />
    </div>
  );
}

function CommunityBuilderView() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[292px] items-start left-0 pb-0 pt-[12px] px-[12px] top-0 w-[255px]" data-name="CommunityBuilderView">
      <Button22 />
      <Container15 />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[16px] relative shrink-0 w-[71.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[71.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[36px] not-italic text-[#6a7282] text-[12px] text-center text-nowrap top-px tracking-[0.3px] translate-x-[-50%] uppercase whitespace-pre">Online — 5</p>
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button30() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[24px] items-center justify-between px-[8px] py-0 relative w-full">
          <Text20 />
          <Icon32 />
        </div>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[20px] left-[40px] overflow-clip top-[6px] w-[183px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Sarah</p>
    </div>
  );
}

function ImageSarahChen() {
  return <div className="absolute left-0 rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Sarah Chen)" />;
}

function Container16() {
  return <div className="absolute bg-[#00c950] border border-solid border-white left-[16px] rounded-[1.67772e+07px] size-[8px] top-[16px]" data-name="Container" />;
}

function Container17() {
  return (
    <div className="absolute left-[8px] size-[24px] top-[4px]" data-name="Container">
      <ImageSarahChen />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <Text21 />
      <Container17 />
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[20px] left-[40px] overflow-clip top-[6px] w-[183px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Marcus</p>
    </div>
  );
}

function ImageMarcusWebb() {
  return <div className="absolute left-0 rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Marcus Webb)" />;
}

function Container19() {
  return <div className="absolute bg-[#00c950] border border-solid border-white left-[16px] rounded-[1.67772e+07px] size-[8px] top-[16px]" data-name="Container" />;
}

function Container20() {
  return (
    <div className="absolute left-[8px] size-[24px] top-[4px]" data-name="Container">
      <ImageMarcusWebb />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <Text22 />
      <Container20 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[20px] left-[40px] overflow-clip top-[6px] w-[183px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Elena</p>
    </div>
  );
}

function ImageElenaRodriguez() {
  return <div className="absolute left-0 rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Elena Rodriguez)" />;
}

function Container22() {
  return <div className="absolute bg-[#00c950] border border-solid border-white left-[16px] rounded-[1.67772e+07px] size-[8px] top-[16px]" data-name="Container" />;
}

function Container23() {
  return (
    <div className="absolute left-[8px] size-[24px] top-[4px]" data-name="Container">
      <ImageElenaRodriguez />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <Text23 />
      <Container23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute h-[20px] left-[40px] overflow-clip top-[6px] w-[183px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Aisha</p>
    </div>
  );
}

function ImageAishaKumar() {
  return <div className="absolute left-0 rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Aisha Kumar)" />;
}

function Container25() {
  return <div className="absolute bg-[#00c950] border border-solid border-white left-[16px] rounded-[1.67772e+07px] size-[8px] top-[16px]" data-name="Container" />;
}

function Container26() {
  return (
    <div className="absolute left-[8px] size-[24px] top-[4px]" data-name="Container">
      <ImageAishaKumar />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <Text24 />
      <Container26 />
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[20px] left-[40px] overflow-clip top-[6px] w-[183px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Lisa</p>
    </div>
  );
}

function ImageLisaWong() {
  return <div className="absolute left-0 rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Lisa Wong)" />;
}

function Container28() {
  return <div className="absolute bg-[#00c950] border border-solid border-white left-[16px] rounded-[1.67772e+07px] size-[8px] top-[16px]" data-name="Container" />;
}

function Container29() {
  return (
    <div className="absolute left-[8px] size-[24px] top-[4px]" data-name="Container">
      <ImageLisaWong />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <Text25 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[176px] items-start relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container21 />
      <Container24 />
      <Container27 />
      <Container30 />
    </div>
  );
}

function CommunityBuilderView1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[233px] items-start left-0 pb-0 pt-[13px] px-[12px] top-[292px] w-[255px]" data-name="CommunityBuilderView">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button30 />
      <Container31 />
    </div>
  );
}

function ScrollAreaViewport() {
  return (
    <div className="h-[525px] relative shrink-0 w-full" data-name="ScrollAreaViewport">
      <CommunityBuilderView />
      <CommunityBuilderView1 />
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[255px]" data-name="Primitive.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[255px]">
        <ScrollAreaViewport />
      </div>
    </div>
  );
}

function ImageYou() {
  return (
    <div className="relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Image (You)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[32px]" />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">You</p>
    </div>
  );
}

function Text26() {
  return <div className="absolute bg-[#00c950] left-0 rounded-[1.67772e+07px] size-[6px] top-[5px]" data-name="Text" />;
}

function Paragraph2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <Text26 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[10px] not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">Online</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.41%_12.68%]" data-name="Vector">
        <div className="absolute inset-[-5.01%_-5.58%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
            <path d={svgPaths.pce781e0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon33 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-center relative shrink-0 w-full" data-name="Container">
      <ImageYou />
      <Container32 />
      <Button31 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[61px] relative shrink-0 w-[255px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[61px] items-start pb-0 pt-[13px] px-[12px] relative w-[255px]">
        <Container33 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[1093px] items-start pl-0 pr-px py-0 relative shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container14 />
      <PrimitiveDiv />
      <Container34 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-[94.016px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[94.016px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Activity Feed</p>
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12824f00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button32() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[81.563px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[81.563px]">
        <Icon34 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[54px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[6.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Filter</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Button32 />
    </div>
  );
}

function ImageYou1() {
  return (
    <div className="relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Image (You)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[40px]" />
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[87.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[87.266px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[44px] not-italic text-[#6a7282] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Start a post...</p>
      </div>
    </div>
  );
}

function Button33() {
  return (
    <div className="h-[68px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[68px] items-center pl-[14px] pr-[2px] py-[2px] relative w-full">
          <ImageYou1 />
          <Text27 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[149px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[149px] items-start pb-px pt-[16px] px-[24px] relative w-full">
          <Container36 />
          <Button33 />
        </div>
      </div>
    </div>
  );
}

function ImageSarahChen1() {
  return (
    <div className="relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Image (Sarah Chen)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[40px]" />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[20px] relative shrink-0 w-[74.805px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[74.805px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Sarah Chen</p>
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[16px] relative shrink-0 w-[117.258px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[117.258px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">Community Manager</p>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[24px] relative shrink-0 w-[7.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[7.234px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">2 hours ago</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Text28 />
      <Text29 />
      <Text30 />
      <Text31 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2 4.5H10" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 7.5H10" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1.5L4 10.5" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1.5L7 10.5" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[95.602px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[95.602px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">design-feedback</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[4px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon35 />
      <Text32 />
    </div>
  );
}

function Container40() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Container38 />
        <Container39 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[45.83%] right-[45.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[45.83%] right-[45.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SlotClone() {
  return (
    <div className="h-[44px] relative shrink-0 w-[16px]" data-name="SlotClone">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start pb-0 pt-[14px] px-0 relative w-[16px]">
        <Icon36 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[12px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <ImageSarahChen1 />
      <Container40 />
      <SlotClone />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#101828] text-[14px] top-px tracking-[-0.1504px] w-[618px]">{`Just finished the new landing page design! Would love to get your feedback on the color palette and layout. I've attached some screenshots below.`}</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-gray-100 content-stretch flex h-[192px] items-center justify-center relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">[Image Preview]</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">👍</p>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[12.813px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[6.5px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">12</p>
      </div>
    </div>
  );
}

function Button34() {
  return (
    <div className="bg-gray-50 h-[30px] relative rounded-[8px] shrink-0 w-[52.813px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[30px] items-center px-[11px] py-px relative w-[52.813px]">
        <Text33 />
        <Text34 />
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">🎨</p>
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[16px] relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[7.422px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[4px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Button35() {
  return (
    <div className="bg-purple-50 h-[30px] relative rounded-[8px] shrink-0 w-[47.422px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[30px] items-center px-[11px] py-px relative w-[47.422px]">
        <Text35 />
        <Text36 />
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">🔥</p>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[16px] relative shrink-0 w-[7.523px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[7.523px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[4px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Button36() {
  return (
    <div className="bg-gray-50 h-[30px] relative rounded-[8px] shrink-0 w-[47.523px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[30px] items-center px-[11px] py-px relative w-[47.523px]">
        <Text37 />
        <Text38 />
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="basis-0 grow h-[14px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
              <path d={svgPaths.p13f5b400} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[58.33%_33.33%_33.33%_33.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 3">
              <path d={svgPaths.p2f07d600} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%_62.46%_62.5%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-0.58px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
              <path d="M0.583333 0.583333H0.589167" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%_37.46%_62.5%_62.5%]" data-name="Vector">
          <div className="absolute inset-[-0.58px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
              <path d="M0.583333 0.583333H0.589167" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button37() {
  return (
    <div className="bg-white h-[24px] relative rounded-[8px] shrink-0 w-[36px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center px-[11px] py-px relative w-[36px]">
        <Icon37 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Button34 />
      <Button35 />
      <Button36 />
      <Button37 />
    </div>
  );
}

function ImageElenaRodriguez1() {
  return <div className="absolute border-2 border-solid border-white left-0 rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Elena Rodriguez)" />;
}

function ImageAishaKumar1() {
  return <div className="absolute border-2 border-solid border-white left-[16px] rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Aisha Kumar)" />;
}

function Container44() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[40px]">
        <ImageElenaRodriguez1 />
        <ImageAishaKumar1 />
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[20px] relative shrink-0 w-[55.039px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[55.039px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[56px]">2 replies</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[638px]" data-name="Container">
      <Container44 />
      <Text39 />
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[16px] relative shrink-0 w-[93.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[93.313px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">Elena Rodriguez</p>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[16px] relative shrink-0 w-[313.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] overflow-clip relative rounded-[inherit] w-[313.734px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">This looks amazing! The color scheme is very modern...</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-start left-[32px] top-[32px] w-[606px]" data-name="Container">
      <Text40 />
      <Text41 />
    </div>
  );
}

function Button38() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Button">
      <Container45 />
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-white h-[457px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[457px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container41 />
          <Paragraph3 />
          <Container42 />
          <Container43 />
          <Button38 />
        </div>
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M6 8.5V11" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3f5ae100} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[16px] relative shrink-0 w-[67.195px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[67.195px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">Pinned post</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[29px] items-center pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Icon38 />
      <Text42 />
    </div>
  );
}

function ImageMarcusWebb1() {
  return (
    <div className="relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Image (Marcus Webb)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[40px]" />
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[20px] relative shrink-0 w-[88.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[88.766px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Marcus Webb</p>
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[16px] relative shrink-0 w-[57.813px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[57.813px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">Tech Lead</p>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[24px] relative shrink-0 w-[7.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[7.234px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[16px] relative shrink-0 w-[67.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[67.078px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">5 hours ago</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Text43 />
      <Text44 />
      <Text45 />
      <Text46 />
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2 4.5H10" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 7.5H10" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1.5L4 10.5" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1.5L7 10.5" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[16px] relative shrink-0 w-[90.117px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[90.117px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">announcements</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex gap-[4px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon39 />
      <Text47 />
    </div>
  );
}

function Container51() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function Icon40() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[45.83%] right-[45.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[45.83%] right-[45.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SlotClone1() {
  return (
    <div className="h-[44px] relative shrink-0 w-[16px]" data-name="SlotClone">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start pb-0 pt-[14px] px-0 relative w-[16px]">
        <Icon40 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex gap-[12px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <ImageMarcusWebb1 />
      <Container51 />
      <SlotClone1 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#101828] text-[14px] top-px tracking-[-0.1504px] w-[602px]">{`Quick reminder: Our monthly community call is tomorrow at 3 PM EST. We'll be discussing Q1 goals and upcoming features. Looking forward to seeing everyone there!`}</p>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[20px] relative shrink-0 w-[14px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[14px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">👍</p>
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[7.5px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">24</p>
      </div>
    </div>
  );
}

function Button39() {
  return (
    <div className="bg-purple-50 h-[30px] relative rounded-[8px] shrink-0 w-[54.789px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e9d4ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[30px] items-center px-[11px] py-px relative w-[54.789px]">
        <Text48 />
        <Text49 />
      </div>
    </div>
  );
}

function Text50() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">📅</p>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[12.984px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[6.5px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">15</p>
      </div>
    </div>
  );
}

function Button40() {
  return (
    <div className="bg-gray-50 h-[30px] relative rounded-[8px] shrink-0 w-[52.984px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[30px] items-center px-[11px] py-px relative w-[52.984px]">
        <Text50 />
        <Text51 />
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="basis-0 grow h-[14px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
              <path d={svgPaths.p13f5b400} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[58.33%_33.33%_33.33%_33.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 3">
              <path d={svgPaths.p2f07d600} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%_62.46%_62.5%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-0.58px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
              <path d="M0.583333 0.583333H0.589167" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%_37.46%_62.5%_62.5%]" data-name="Vector">
          <div className="absolute inset-[-0.58px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
              <path d="M0.583333 0.583333H0.589167" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button41() {
  return (
    <div className="bg-white h-[24px] relative rounded-[8px] shrink-0 w-[36px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center px-[11px] py-px relative w-[36px]">
        <Icon41 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Button39 />
      <Button40 />
      <Button41 />
    </div>
  );
}

function ImageJamesPark() {
  return (
    <div className="relative rounded-[1.67772e+07px] shrink-0 size-[24px]" data-name="Image (James Park)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[24px]" />
      <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-[1.67772e+07px]" />
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[20px] relative shrink-0 w-[42.195px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[42.195px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[43px]">1 reply</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[638px]" data-name="Container">
      <ImageJamesPark />
      <Text52 />
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.703px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">James Park</p>
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[16px] relative shrink-0 w-[197.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] overflow-clip relative rounded-[inherit] w-[197.313px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">Will there be a recording available?</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-start left-[32px] top-[32px] w-[606px]" data-name="Container">
      <Text53 />
      <Text54 />
    </div>
  );
}

function Button42() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Button">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-white h-[294px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[294px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container48 />
          <Container52 />
          <Paragraph4 />
          <Container53 />
          <Button42 />
        </div>
      </div>
    </div>
  );
}

function ImageElenaRodriguez2() {
  return (
    <div className="relative rounded-[1.67772e+07px] shrink-0 size-[40px]" data-name="Image (Elena Rodriguez)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[40px]" />
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[20px] relative shrink-0 w-[104.305px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[104.305px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Elena Rodriguez</p>
      </div>
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[16px] relative shrink-0 w-[98.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[98.609px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">Product Designer</p>
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[24px] relative shrink-0 w-[7.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[7.234px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">•</p>
      </div>
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[16px] relative shrink-0 w-[53.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[53.617px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">1 day ago</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Text55 />
      <Text56 />
      <Text57 />
      <Text58 />
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2 4.5H10" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 7.5H10" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1.5L4 10.5" id="Vector_3" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1.5L7 10.5" id="Vector_4" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[16px] relative shrink-0 w-[42.258px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[42.258px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">general</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[4px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon42 />
      <Text59 />
    </div>
  );
}

function Container59() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Container57 />
        <Container58 />
      </div>
    </div>
  );
}

function Icon43() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[45.83%] right-[45.83%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[45.83%] right-[45.83%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
            <path d={svgPaths.p23ccba00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SlotClone2() {
  return (
    <div className="h-[44px] relative shrink-0 w-[16px]" data-name="SlotClone">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start pb-0 pt-[14px] px-0 relative w-[16px]">
        <Icon43 />
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[12px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <ImageElenaRodriguez2 />
      <Container59 />
      <SlotClone2 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.75px] left-0 not-italic text-[#101828] text-[14px] top-px tracking-[-0.1504px] w-[637px]">{`Has anyone tried the new analytics dashboard? The insights are incredibly detailed! I'm particularly impressed with the user journey tracking feature.`}</p>
    </div>
  );
}

function Text60() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">🔥</p>
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[16px] relative shrink-0 w-[6.836px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[6.836px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[3.5px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">7</p>
      </div>
    </div>
  );
}

function Button43() {
  return (
    <div className="bg-gray-50 h-[30px] relative rounded-[8px] shrink-0 w-[46.836px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[30px] items-center px-[11px] py-px relative w-[46.836px]">
        <Text60 />
        <Text61 />
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✨</p>
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[16px] relative shrink-0 w-[7.523px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[7.523px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[4px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Button44() {
  return (
    <div className="bg-gray-50 h-[30px] relative rounded-[8px] shrink-0 w-[47.523px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[30px] items-center px-[11px] py-px relative w-[47.523px]">
        <Text62 />
        <Text63 />
      </div>
    </div>
  );
}

function Text64() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[7px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">👀</p>
      </div>
    </div>
  );
}

function Text65() {
  return (
    <div className="h-[16px] relative shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[7.422px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[4px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-px translate-x-[-50%] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Button45() {
  return (
    <div className="bg-gray-50 h-[30px] relative rounded-[8px] shrink-0 w-[47.422px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[30px] items-center px-[11px] py-px relative w-[47.422px]">
        <Text64 />
        <Text65 />
      </div>
    </div>
  );
}

function Icon44() {
  return (
    <div className="basis-0 grow h-[14px] min-h-px min-w-px relative shrink-0" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] overflow-clip relative rounded-[inherit] w-full">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
              <path d={svgPaths.p13f5b400} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[58.33%_33.33%_33.33%_33.33%]" data-name="Vector">
          <div className="absolute inset-[-50%_-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 3">
              <path d={svgPaths.p2f07d600} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%_62.46%_62.5%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-0.58px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
              <path d="M0.583333 0.583333H0.589167" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[37.5%_37.46%_62.5%_62.5%]" data-name="Vector">
          <div className="absolute inset-[-0.58px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
              <path d="M0.583333 0.583333H0.589167" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button46() {
  return (
    <div className="bg-white h-[24px] relative rounded-[8px] shrink-0 w-[36px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center px-[11px] py-px relative w-[36px]">
        <Icon44 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[43px] items-center pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Button43 />
      <Button44 />
      <Button45 />
      <Button46 />
    </div>
  );
}

function ImageSarahChen2() {
  return <div className="absolute border-2 border-solid border-white left-0 rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Sarah Chen)" />;
}

function ImageTomAnderson() {
  return <div className="absolute border-2 border-solid border-white left-[16px] rounded-[1.67772e+07px] size-[24px] top-0" data-name="Image (Tom Anderson)" />;
}

function Container62() {
  return (
    <div className="h-[24px] relative shrink-0 w-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[40px]">
        <ImageSarahChen2 />
        <ImageTomAnderson />
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[20px] relative shrink-0 w-[55.039px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[55.039px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[56px]">2 replies</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-0 w-[638px]" data-name="Container">
      <Container62 />
      <Text66 />
    </div>
  );
}

function Text67() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.664px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.664px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">Sarah Chen</p>
      </div>
    </div>
  );
}

function Text68() {
  return (
    <div className="h-[16px] relative shrink-0 w-[281.852px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] overflow-clip relative rounded-[inherit] w-[281.852px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-px whitespace-pre">Yes! The conversion funnel view is super helpful...</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[16px] items-start left-[32px] top-[32px] w-[606px]" data-name="Container">
      <Text67 />
      <Text68 />
    </div>
  );
}

function Button47() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Button">
      <Container63 />
      <Container64 />
    </div>
  );
}

function Container65() {
  return (
    <div className="bg-white h-[253px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[253px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container60 />
          <Paragraph5 />
          <Container61 />
          <Button47 />
        </div>
      </div>
    </div>
  );
}

function CommunityBuilderView2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[1036px] items-start relative shrink-0 w-full" data-name="CommunityBuilderView">
      <Container47 />
      <Container56 />
      <Container65 />
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="h-[1036px] relative shrink-0 w-full" data-name="Primitive.div">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[1036px] items-start pl-0 pr-[221px] py-0 relative w-full">
          <CommunityBuilderView2 />
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container37 />
      <PrimitiveDiv1 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-center min-h-px min-w-px relative shrink-0 w-full">
      <Container35 />
      <Container66 />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative rounded-[12px] shrink-0 w-full" data-name="EmptyState">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame15 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[10px] items-start relative size-full">
        <Header2 />
        <EmptyState />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] items-center relative">
        <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[24px] relative shrink-0 text-[16px] text-nowrap text-zinc-800 whitespace-pre">Co-pilot for communities</p>
      </div>
    </div>
  );
}

function Icon45() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_47_643)" id="Icon">
          <path d={svgPaths.p3d1ec300} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p6b82b00} fill="var(--fill-0, #0A0A0A)" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_47_643">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button48() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon45 />
      </div>
    </div>
  );
}

function Icon46() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1e5fde80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 1.75V4.66667H4.66667" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M7 4.08333V7L9.33333 8.16667" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button49() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon46 />
      </div>
    </div>
  );
}

function Icon47() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p2b899180} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p4c1f200} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button50() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-center justify-center relative w-full">
        <Icon47 />
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[28px] relative shrink-0 w-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[28px] items-center relative w-[92px]">
        <Button48 />
        <Button49 />
        <Button50 />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[57px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[57px] items-center justify-between pb-px pt-0 px-[23px] relative w-full">
          <Frame2 />
          <Container67 />
        </div>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['SF_Pro:Medium',sans-serif] font-[510] grow leading-[22.75px] min-h-px min-w-px relative shrink-0 text-[14px] text-zinc-700">Make me a community for developers who stay late at night and make a lot of other things other than just doing their jobs...</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="bg-[#f6f3f8] box-border content-stretch flex flex-col items-start p-[16px] relative rounded-bl-[8px] rounded-br-[8px] rounded-tl-[8px] shrink-0 w-[349px]" data-name="Container">
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[29.891px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[29.891px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-nowrap whitespace-pre">14:31</p>
      </div>
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3.5 5.5V11.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p472fa80} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button51() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon48 />
      </div>
    </div>
  );
}

function Icon49() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M8.5 7.5V1.5" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pced6900} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button52() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon49 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[24px] relative shrink-0 w-[52px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[24px] items-center relative w-[52px]">
        <Button51 />
        <Button52 />
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[24px] items-center justify-between pl-[4px] pr-0 py-0 relative w-full">
          <Paragraph7 />
          <Container70 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[12px] py-0 relative shrink-0">
      <Container69 />
      <Container71 />
    </div>
  );
}

function Group4() {
  return (
    <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute inset-[12.14%_80.25%_82.57%_14.48%] mask-position-[0px,_0px] mask-size-[1.792px_1.799px,_1.792px_1.799px]" data-name="Group" style={{ maskImage: `url('${imgGroup4}'), url('${imgGroup5}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
        <g id="Group">
          <path d="M0 0H1.79157V1.79903H0V0Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-[12.14%_80.25%_82.57%_14.48%]" data-name="Clip path group">
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[12.14%_80.25%_82.57%_14.48%]" data-name="Group">
      <ClipPathGroup4 />
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <div className="absolute contents inset-[12.14%_80.25%_82.57%_14.48%]" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function Group6() {
  return (
    <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute inset-[12.15%_14.47%_82.56%_80.26%] mask-position-[-0.001px,_0px_0px,_0px] mask-size-[1.794px_1.799px,_1.794px_1.799px]" data-name="Group" style={{ maskImage: `url('${imgGroup6}'), url('${imgGroup7}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
        <g id="Group">
          <path d="M0 0H1.79356V1.79903H0V0Z" fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup6() {
  return (
    <div className="absolute contents inset-[12.15%_14.47%_82.56%_80.26%]" data-name="Clip path group">
      <Group6 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[12.15%_14.47%_82.56%_80.26%]" data-name="Group">
      <ClipPathGroup6 />
    </div>
  );
}

function ClipPathGroup7() {
  return (
    <div className="absolute contents inset-[12.14%_14.47%_82.56%_80.26%]" data-name="Clip path group">
      <Group7 />
    </div>
  );
}

function LogoIcon1() {
  return (
    <div className="absolute left-[7px] size-[34px] top-[22.5px]" data-name="Logo_icon">
      <div className="absolute inset-[5.73%_10.11%_14.24%_10.1%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <path d={svgPaths.p10855200} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[25.43%] left-0 right-[75.59%] top-[50.08%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
          <path d={svgPaths.p2dfec500} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[25.43%] left-[75.58%] right-0 top-[50.08%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
          <path d={svgPaths.p156eaa40} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-[7.22%] right-[64.34%] top-[71.47%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <path d={svgPaths.p3cca3200} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-[64.34%] right-[7.23%] top-[71.47%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <path d={svgPaths.pd451400} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[34.27%_11.42%_12.56%_11.41%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 19">
          <path d={svgPaths.p33704100} fill="var(--fill-0, #F7FFDD)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.75%] left-[0.14%] right-[65.72%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path d={svgPaths.p12c62a80} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[10.58%_76.27%_76.33%_10.68%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <path d={svgPaths.p8849270} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[12.52%_80.89%_85.36%_15.32%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 1">
          <path d={svgPaths.p26ebbb80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[65.75%] left-[65.72%] right-[0.14%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path d={svgPaths.p3efd3e00} fill="var(--fill-0, #0CB76A)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[10.58%_10.69%_76.33%_76.26%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          <path d={svgPaths.p15ee9880} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[12.52%_15.32%_85.36%_80.89%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 1">
          <path d={svgPaths.p2f6f7880} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[18.28%_40.14%_70.14%_40.14%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4">
          <path d={svgPaths.p36df0f00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <ClipPathGroup5 />
      <ClipPathGroup7 />
    </div>
  );
}

function Container72() {
  return (
    <div className="bg-[#ddfbed] relative rounded-[100px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative rounded-[inherit] size-[48px]">
        <LogoIcon1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function Container73() {
  return (
    <div className="bg-[#420d74] relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Container72 />
      </div>
    </div>
  );
}

function Text69() {
  return (
    <div className="h-[24px] relative shrink-0 w-[46.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[46.297px]">
        <p className="absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[24px] left-0 text-[16px] text-nowrap text-zinc-800 top-[-0.5px] whitespace-pre">Leapy</p>
      </div>
    </div>
  );
}

function Text70() {
  return (
    <div className="bg-[#ddfbed] h-[20px] relative rounded-[4px] shrink-0 w-[84px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[84px]">
        <p className="absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] left-[8.3px] text-[#0cb76a] text-[12px] text-nowrap top-[2.25px] whitespace-pre">AI Assistant</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Text69 />
      <Text70 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[330px]">
      <Container74 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="relative shrink-0 size-[15.771px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p1d8294c0} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.31424" />
        </g>
      </svg>
    </div>
  );
}

function Text71() {
  return (
    <div className="h-[20px] relative shrink-0 w-[110.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[110.328px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#420d74] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Thinking process</p>
      </div>
    </div>
  );
}

function Icon51() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 4.5L6 7.5L9 4.5" id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button53() {
  return (
    <div className="box-border content-stretch flex gap-[6.115px] h-[20px] items-center pr-0 py-0 relative shrink-0 w-full" data-name="Button">
      <Icon50 />
      <Text71 />
      <Icon51 />
    </div>
  );
}

function Container75() {
  return (
    <div className="bg-[#fcf7ff] h-[36px] relative rounded-br-[10px] rounded-tr-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#420d74] border-[0px_0px_0px_2px] border-solid inset-0 pointer-events-none rounded-br-[10px] rounded-tr-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[36px] items-start pb-0 pl-[18px] pr-[16px] pt-[8px] relative w-full">
          <Button53 />
        </div>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[26px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[16px] tracking-[-0.3125px]">{`Perfect! I've generated a course description and learning outcomes for "Web dev". Feel free to edit anything below:`}</p>
    </div>
  );
}

function Icon52() {
  return (
    <div className="absolute left-[9px] size-[12px] top-[5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_553)" id="Icon">
          <path d={svgPaths.p3eda9c00} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 1V3" id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 2H9" id="Vector_3" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1346bf00} id="Vector_4" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_553">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[#fcf7ff] h-[22px] relative rounded-[8px] shrink-0 w-[113.656px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] overflow-clip relative rounded-[inherit] w-[113.656px]">
        <Icon52 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[29px] not-italic text-[#420d74] text-[12px] text-nowrap top-[3px] whitespace-pre">AI Generated</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#fcf7ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon53() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_540)" id="Icon">
          <path d={svgPaths.p38e24a80} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 3.5L8.5 5" id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 3V5" id="Vector_3" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 7V9" id="Vector_4" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1V2" id="Vector_5" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 4H1.5" id="Vector_6" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 8H8.5" id="Vector_7" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 1.5H4.5" id="Vector_8" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_540">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button54() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[138.328px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[138.328px]">
        <Icon53 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[32px] not-italic text-[#420d74] text-[14px] text-nowrap top-[6px] tracking-[-0.1504px] whitespace-pre">Regenerate All</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Badge5 />
      <Button54 />
    </div>
  );
}

function Text72() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-[87.22px] top-[3px] w-[7.234px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#fb2c36] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">*</p>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[24px] relative shrink-0 w-[94.453px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[94.453px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#364153] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Description</p>
        <Text72 />
      </div>
    </div>
  );
}

function Icon54() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3892d900} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 1.5V4H4" id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button55() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[108.359px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[108.359px]">
        <Icon54 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#420d74] text-[12px] text-nowrap top-[6px] whitespace-pre">Regenerate</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label />
      <Button55 />
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#f3f3f5] h-[64px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[64px] items-start px-[12px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Community description...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container78() {
  return (
    <div className="h-[134px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[134px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container77 />
          <Textarea />
        </div>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[117.781px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[117.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#364153] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Target Audience</p>
      </div>
    </div>
  );
}

function Icon55() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_582)" id="Icon">
          <path d={svgPaths.p804df00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_582">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button56() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[64.453px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[64.453px]">
        <Icon55 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#4a5565] text-[12px] text-nowrap top-[6px] whitespace-pre">Edit</p>
      </div>
    </div>
  );
}

function Icon56() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3892d900} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 1.5V4H4" id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button57() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-full">
        <Icon56 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#420d74] text-[12px] text-nowrap top-[6px] whitespace-pre">Regenerate</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[28px] relative shrink-0 w-[176.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[28px] items-start relative w-[176.813px]">
        <Button56 />
        <Button57 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container79 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[16px] tracking-[-0.3125px]">Beginners to intermediate designers from East India</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
          <Container80 />
          <Paragraph9 />
        </div>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[141.703px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[141.703px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#364153] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Community Specifics</p>
      </div>
    </div>
  );
}

function Icon57() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3892d900} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 1.5V4H4" id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button58() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[126.375px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[126.375px]">
        <Icon57 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#420d74] text-[12px] text-nowrap top-[6px] whitespace-pre">Regenerate All</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Button58 />
    </div>
  );
}

function Icon58() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2c5f2a40} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text73() {
  return (
    <div className="absolute h-[24px] left-[24px] top-0 w-[552px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Membership Allowed</p>
    </div>
  );
}

function Icon59() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_568)" id="Icon">
          <path d={svgPaths.p804df00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_568">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button59() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon59 />
      </div>
    </div>
  );
}

function Icon60() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M5 5.5V8.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 5.5V8.5" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p16274380} id="Vector_3" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 3H10.5" id="Vector_4" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1c388200} id="Vector_5" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button60() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon60 />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[584px] opacity-0 top-0 w-[52px]" data-name="Container">
      <Button59 />
      <Button60 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Icon58 />
      <Text73 />
      <Container83 />
    </div>
  );
}

function Icon61() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2c5f2a40} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text74() {
  return (
    <div className="absolute h-[24px] left-[24px] top-0 w-[552px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">{`Apply knowledge through practical  projects`}</p>
    </div>
  );
}

function Icon62() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_568)" id="Icon">
          <path d={svgPaths.p804df00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_568">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button61() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon62 />
      </div>
    </div>
  );
}

function Icon63() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M5 5.5V8.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 5.5V8.5" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p16274380} id="Vector_3" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 3H10.5" id="Vector_4" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1c388200} id="Vector_5" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button62() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon63 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[584px] opacity-0 top-0 w-[52px]" data-name="Container">
      <Button61 />
      <Button62 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Icon61 />
      <Text74 />
      <Container84 />
    </div>
  );
}

function Icon64() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2c5f2a40} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text75() {
  return (
    <div className="absolute h-[24px] left-[24px] top-0 w-[552px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Build real-world applications with confidence</p>
    </div>
  );
}

function Icon65() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_568)" id="Icon">
          <path d={svgPaths.p804df00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_568">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button63() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon65 />
      </div>
    </div>
  );
}

function Icon66() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M5 5.5V8.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 5.5V8.5" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p16274380} id="Vector_3" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 3H10.5" id="Vector_4" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1c388200} id="Vector_5" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button64() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon66 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[584px] opacity-0 top-0 w-[52px]" data-name="Container">
      <Button63 />
      <Button64 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Icon64 />
      <Text75 />
      <Container85 />
    </div>
  );
}

function Icon67() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2c5f2a40} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text76() {
  return (
    <div className="absolute h-[24px] left-[24px] top-0 w-[552px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Master advanced techniques and best practices</p>
    </div>
  );
}

function Icon68() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_568)" id="Icon">
          <path d={svgPaths.p804df00} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_568">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button65() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon68 />
      </div>
    </div>
  );
}

function Icon69() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M5 5.5V8.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 5.5V8.5" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p16274380} id="Vector_3" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 3H10.5" id="Vector_4" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1c388200} id="Vector_5" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button66() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon69 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[584px] opacity-0 top-0 w-[52px]" data-name="Container">
      <Button65 />
      <Button66 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Icon67 />
      <Text76 />
      <Container86 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[120px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Input1() {
  return (
    <div className="basis-0 bg-[#f3f3f5] grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Add new learning outcome...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon70() {
  return (
    <div className="absolute left-[11px] size-[12px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M2.5 6H9.5" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 2.5V9.5" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button67() {
  return (
    <div className="bg-white h-[32px] opacity-50 relative rounded-[8px] shrink-0 w-[70.391px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[70.391px]">
        <Icon70 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[33px] not-italic text-[14px] text-neutral-950 text-nowrap top-[6px] tracking-[-0.1504px] whitespace-pre">Add</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Button67 />
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[242px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[242px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container82 />
          <List />
          <Container87 />
        </div>
      </div>
    </div>
  );
}

function Icon71() {
  return (
    <div className="absolute left-[13px] size-[12px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_530)" id="Icon">
          <path d={svgPaths.p38e24a80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 3.5L8.5 5" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 3V5" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 7V9" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1V2" id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 4H1.5" id="Vector_6" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 8H8.5" id="Vector_7" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 1.5H4.5" id="Vector_8" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_530">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button68() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[150.328px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[150.328px]">
        <Icon71 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-neutral-950 text-nowrap top-[8px] tracking-[-0.1504px] whitespace-pre">Regenerate All</p>
      </div>
    </div>
  );
}

function Icon72() {
  return (
    <div className="absolute left-[12px] size-[12px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M10 3L4.5 8.5L2 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button69() {
  return (
    <div className="bg-[#420d74] h-[36px] relative rounded-[8px] shrink-0 w-[197.578px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[197.578px]">
        <Icon72 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[40px] not-italic text-[14px] text-nowrap text-white top-[8px] tracking-[-0.1504px] whitespace-pre">Looks Good, Continue</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[53px] items-start justify-end pb-0 pt-[17px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button68 />
      <Button69 />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[571px] items-start relative shrink-0 w-full" data-name="Container">
      <Container78 />
      <Container81 />
      <Container88 />
      <Container89 />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[619px] items-start relative shrink-0 w-full" data-name="Container">
      <Container76 />
      <Container90 />
    </div>
  );
}

function Container92() {
  return (
    <div className="bg-white h-[797px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[797px] items-start pb-px pt-[25px] px-[25px] relative w-full">
          <Container75 />
          <Paragraph8 />
          <Container91 />
        </div>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[16px] relative shrink-0 w-[30.063px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[30.063px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-nowrap whitespace-pre">16:14</p>
      </div>
    </div>
  );
}

function Icon73() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_647)" id="Icon">
          <path d={svgPaths.p23fe4800} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p99a3180} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_647">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button70() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-0 rounded-[4px] top-0 w-[32px]" data-name="Button">
      <Icon73 />
    </div>
  );
}

function Icon74() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3892d900} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 1.5V4H4" id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button71() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[36px] rounded-[4px] top-0 w-[32px]" data-name="Button">
      <Icon74 />
    </div>
  );
}

function Container93() {
  return <div className="absolute bg-gray-200 h-[16px] left-[76px] top-[6px] w-px" data-name="Container" />;
}

function Icon75() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_651)" id="Icon">
          <path d="M3.5 5V11" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pd036b00} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_651">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button72() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[85px] rounded-[4px] top-0 w-[32px]" data-name="Button">
      <Icon75 />
    </div>
  );
}

function Icon76() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_526)" id="Icon">
          <path d="M8.5 7V1" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p36395c00} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_526">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button73() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[121px] rounded-[4px] top-0 w-[32px]" data-name="Button">
      <Icon76 />
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[28px] opacity-0 relative shrink-0 w-[153px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[153px]">
        <Button70 />
        <Button71 />
        <Container93 />
        <Button72 />
        <Button73 />
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[28px] items-center justify-between px-[4px] py-0 relative w-full">
          <Paragraph10 />
          <Container94 />
        </div>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[833px] items-start relative shrink-0 w-full" data-name="Container">
      <Container92 />
      <Container95 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px mr-[-131px] relative shrink-0">
      <Frame9 />
      <Container96 />
    </div>
  );
}

function Container97() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-start flex flex-wrap gap-[15px] items-start pl-0 pr-[131px] py-0 relative w-full">
        <Frame10 />
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex gap-[12px] h-[119px] items-start relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <Container97 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[83px] items-start relative shrink-0 w-full">
      <Container98 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[24px] py-0 relative w-full">
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[22px] h-[972px] items-end left-0 top-[-329px] w-[683px]">
      <Frame8 />
      <Frame7 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="h-[972px] overflow-clip relative shrink-0 w-full">
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[794px] relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[794px] items-end overflow-clip relative rounded-[inherit] w-full">
        <Container68 />
        <Frame13 />
      </div>
    </div>
  );
}

function Icon77() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_516)" id="Icon">
          <path d={svgPaths.p38870a00} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_516">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button74() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[26px] left-0 rounded-[8px] top-0 w-[88.836px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[43px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">Add a space</p>
    </div>
  );
}

function Button75() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[26px] left-[96.84px] rounded-[8px] top-0 w-[118.875px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[58.5px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">Customize theme</p>
    </div>
  );
}

function Button76() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[26px] left-[223.71px] rounded-[8px] top-0 w-[87.141px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[43.5px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">Set up rules</p>
    </div>
  );
}

function Button77() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[26px] left-[318.85px] rounded-[8px] top-0 w-[106.859px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[52.5px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">Invite members</p>
    </div>
  );
}

function Container99() {
  return (
    <div className="basis-0 grow h-[26px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[26px] relative w-full">
        <Button74 />
        <Button75 />
        <Button76 />
        <Button77 />
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex gap-[8px] h-[30px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Icon77 />
      <Container99 />
    </div>
  );
}

function Container101() {
  return (
    <div className="bg-gray-50 h-[47px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[47px] items-start pb-px pt-[8px] px-[16px] relative w-full">
          <Container100 />
        </div>
      </div>
    </div>
  );
}

function Textarea1() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[80px] left-0 rounded-[8px] top-0 w-[666px]" data-name="Textarea">
      <div className="box-border content-stretch flex h-[80px] items-start overflow-clip pl-[12px] pr-[96px] py-[8px] relative rounded-[inherit] w-[666px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Describe what you want to create... (Press / for commands)</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon78() {
  return (
    <div className="absolute left-[8px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_47_559)" id="Icon">
          <path d={svgPaths.p9b47a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p15e62a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_47_559">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button78() {
  return (
    <div className="absolute bg-[#420d74] left-[614px] opacity-50 rounded-[8px] size-[32px] top-[40px]" data-name="Button">
      <Icon78 />
    </div>
  );
}

function Container102() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Container">
      <Textarea1 />
      <Button78 />
    </div>
  );
}

function Icon79() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M7 11.0833V12.8333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2a46bd80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2db7f480} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button79() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon79 />
      </div>
    </div>
  );
}

function Icon80() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p23de3100} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button80() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon80 />
      </div>
    </div>
  );
}

function Icon81() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_510)" id="Icon">
          <path d={svgPaths.pac8c40} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_510">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button81() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-full">
        <Icon81 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[12px] text-neutral-950 text-nowrap top-[7px] whitespace-pre">Templates</p>
      </div>
    </div>
  );
}

function Icon82() {
  return (
    <div className="absolute left-[10px] size-[12px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_500)" id="Icon">
          <path d={svgPaths.p14da9b00} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 3.5L8.5 5" id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 3V5" id="Vector_3" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 7V9" id="Vector_4" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 1V2" id="Vector_5" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.5 4H1.5" id="Vector_6" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 8H8.5" id="Vector_7" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 1.5H4.5" id="Vector_8" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_500">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button82() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[87.891px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[87.891px]">
        <Icon82 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#420d74] text-[12px] text-nowrap top-[7px] whitespace-pre">Enhance</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="h-[28px] relative shrink-0 w-[252.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[28px] items-center relative w-[252.172px]">
        <Button79 />
        <Button80 />
        <Button81 />
        <Button82 />
      </div>
    </div>
  );
}

function Text77() {
  return (
    <div className="h-[16px] relative shrink-0 w-[42.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[42.172px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">1 tokens</p>
      </div>
    </div>
  );
}

function Kbd1() {
  return (
    <div className="bg-gray-100 h-[22px] relative rounded-[4px] shrink-0 w-[21.227px]" data-name="Kbd">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] relative w-[21.227px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[7px] not-italic text-[#99a1af] text-[12px] text-nowrap top-[4px] whitespace-pre">⌘</p>
      </div>
    </div>
  );
}

function Kbd2() {
  return (
    <div className="basis-0 bg-gray-100 grow h-[22px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Kbd">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[7px] not-italic text-[#99a1af] text-[12px] text-nowrap top-[4px] whitespace-pre">↵</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="h-[22px] relative shrink-0 w-[46.453px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center relative w-[46.453px]">
        <Kbd1 />
        <Kbd2 />
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="h-[22px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[22px] items-center relative">
        <Text77 />
        <Container104 />
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container103 />
      <Container105 />
    </div>
  );
}

function Icon83() {
  return (
    <div className="absolute left-[9px] size-[12px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_47_607)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4V6" id="Vector_2" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8H6.005" id="Vector_3" stroke="var(--stroke-0, #420D74)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_47_607">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text78() {
  return (
    <div className="absolute content-stretch flex h-[14px] items-start left-[14.63px] top-px w-[18.883px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#420d74] text-[12px] text-nowrap whitespace-pre">Tip:</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[32px] left-[29px] top-[9px] w-[429px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#420d74] text-[12px] text-nowrap top-px whitespace-pre">💡</p>
      <Text78 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[42px] not-italic text-[#3e3e3e] text-[12px] top-px w-[428px]">{`Be specific about what you want. Example: "Generate 5 modules for a Python course targeting beginners"`}</p>
    </div>
  );
}

function Container107() {
  return (
    <div className="bg-[#fcf7ff] h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#fcf7ff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon83 />
      <Paragraph11 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-start pb-[18px] pt-0 px-0 relative shrink-0 w-full">
      <Container102 />
      <Container106 />
      <Container107 />
    </div>
  );
}

function Container108() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Frame14 />
        </div>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-px px-0 relative w-full">
        <Container101 />
        <Container108 />
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="bg-white h-[1163px] relative shrink-0 w-[684px]" data-name="RightPanel">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[1163px] items-start justify-between pl-px pr-0 py-0 relative w-[684px]">
        <Frame6 />
        <Container109 />
      </div>
    </div>
  );
}

function RightPanel1() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex h-[1163px] items-start justify-between pl-px pr-0 py-0 right-0 w-[2107px]" data-name="RightPanel">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Frame11 />
      <RightPanel />
    </div>
  );
}

function Icon84() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #52525C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button83() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[71px] p-px rounded-[1.67772e+07px] size-[24px] top-[184px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[1.67772e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <Icon84 />
    </div>
  );
}

export default function User() {
  return (
    <div className="relative size-full" data-name="User">
      <V />
      <Sidebar />
      <RightPanel1 />
      <Button83 />
    </div>
  );
}