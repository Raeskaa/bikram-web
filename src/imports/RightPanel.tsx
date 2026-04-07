import svgPaths from "./svg-lewl38c963";
import { imgGroup, imgGroup1, imgGroup2, imgGroup3 } from "./svg-vsfc3";

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] items-center relative">
        <p className="font-['SF_Pro:Medium',sans-serif] font-[510] leading-[24px] relative shrink-0 text-[16px] text-nowrap text-zinc-800 whitespace-pre">Co-pilot for communities</p>
      </div>
    </div>
  );
}

function Icon() {
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

function Button() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
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

function Button1() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
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

function Button2() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28px] items-center justify-center relative w-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[28px] relative shrink-0 w-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[28px] items-center relative w-[92px]">
        <Button />
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[57px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[57px] items-center justify-between pb-px pt-0 px-[23px] relative w-full">
          <Frame />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['SF_Pro:Medium',sans-serif] font-[510] grow leading-[22.75px] min-h-px min-w-px relative shrink-0 text-[14px] text-zinc-700">Make me a community for developers who stay late at night and make a lot of other things other than just doing their jobs...</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#f6f3f8] box-border content-stretch flex flex-col items-start p-[16px] relative rounded-bl-[8px] rounded-br-[8px] rounded-tl-[8px] shrink-0 w-[349px]" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[29.891px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[29.891px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-nowrap whitespace-pre">14:31</p>
      </div>
    </div>
  );
}

function Icon3() {
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

function Button3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
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

function Button4() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[52px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[24px] items-center relative w-[52px]">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[24px] items-center justify-between pl-[4px] pr-0 py-0 relative w-full">
          <Paragraph1 />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[12px] py-0 relative shrink-0">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Group() {
  return (
    <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute inset-[12.14%_80.25%_82.57%_14.48%] mask-position-[0px,_0px] mask-size-[1.792px_1.799px,_1.792px_1.799px]" data-name="Group" style={{ maskImage: `url('${imgGroup}'), url('${imgGroup1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
        <g id="Group">
          <path d="M0 0H1.79157V1.79903H0V0Z" fill="var(--fill-0, white)" id="Vector" />
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
    <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute inset-[12.15%_14.47%_82.56%_80.26%] mask-position-[-0.001px,_0px_0px,_0px] mask-size-[1.794px_1.799px,_1.794px_1.799px]" data-name="Group" style={{ maskImage: `url('${imgGroup2}'), url('${imgGroup3}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
        <g id="Group">
          <path d="M0 0H1.79356V1.79903H0V0Z" fill="var(--fill-0, white)" id="Vector" />
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
      <ClipPathGroup1 />
      <ClipPathGroup3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#ddfbed] relative rounded-[100px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative rounded-[inherit] size-[48px]">
        <LogoIcon />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[100px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#420d74] relative rounded-[3.35544e+07px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Container5 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[46.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[46.297px]">
        <p className="absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[24px] left-0 text-[16px] text-nowrap text-zinc-800 top-[-0.5px] whitespace-pre">Leapy</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#ddfbed] h-[20px] relative rounded-[4px] shrink-0 w-[84px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[84px]">
        <p className="absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] left-[8.3px] text-[#0cb76a] text-[12px] text-nowrap top-[2.25px] whitespace-pre">AI Assistant</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[330px]">
      <Container7 />
    </div>
  );
}

function Icon5() {
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

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[110.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[110.328px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#420d74] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Thinking process</p>
      </div>
    </div>
  );
}

function Icon6() {
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

function Button5() {
  return (
    <div className="box-border content-stretch flex gap-[6.115px] h-[20px] items-center pr-0 py-0 relative shrink-0 w-full" data-name="Button">
      <Icon5 />
      <Text2 />
      <Icon6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#fcf7ff] h-[36px] relative rounded-br-[10px] rounded-tr-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#420d74] border-[0px_0px_0px_2px] border-solid inset-0 pointer-events-none rounded-br-[10px] rounded-tr-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[36px] items-start pb-0 pl-[18px] pr-[16px] pt-[8px] relative w-full">
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[26px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[16px] tracking-[-0.3125px]">{`Perfect! I've generated a course description and learning outcomes for "Web dev". Feel free to edit anything below:`}</p>
    </div>
  );
}

function Icon7() {
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

function Badge() {
  return (
    <div className="bg-[#fcf7ff] h-[22px] relative rounded-[8px] shrink-0 w-[113.656px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] overflow-clip relative rounded-[inherit] w-[113.656px]">
        <Icon7 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[29px] not-italic text-[#420d74] text-[12px] text-nowrap top-[3px] whitespace-pre">AI Generated</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#fcf7ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon8() {
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

function Button6() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[138.328px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[138.328px]">
        <Icon8 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[32px] not-italic text-[#420d74] text-[14px] text-nowrap top-[6px] tracking-[-0.1504px] whitespace-pre">Regenerate All</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Badge />
      <Button6 />
    </div>
  );
}

function Text3() {
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
        <Text3 />
      </div>
    </div>
  );
}

function Icon9() {
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

function Button7() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[108.359px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[108.359px]">
        <Icon9 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#420d74] text-[12px] text-nowrap top-[6px] whitespace-pre">Regenerate</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label />
      <Button7 />
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

function Container11() {
  return (
    <div className="h-[134px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[134px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container10 />
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

function Icon10() {
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

function Button8() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[64.453px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[64.453px]">
        <Icon10 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#4a5565] text-[12px] text-nowrap top-[6px] whitespace-pre">Edit</p>
      </div>
    </div>
  );
}

function Icon11() {
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

function Button9() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-full">
        <Icon11 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#420d74] text-[12px] text-nowrap top-[6px] whitespace-pre">Regenerate</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[28px] relative shrink-0 w-[176.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[28px] items-start relative w-[176.813px]">
        <Button8 />
        <Button9 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container12 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[16px] tracking-[-0.3125px]">Beginners to intermediate designers from East India</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
          <Container13 />
          <Paragraph3 />
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

function Icon12() {
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

function Button10() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[126.375px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[126.375px]">
        <Icon12 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#420d74] text-[12px] text-nowrap top-[6px] whitespace-pre">Regenerate All</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Button10 />
    </div>
  );
}

function Icon13() {
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

function Text4() {
  return (
    <div className="absolute h-[24px] left-[24px] top-0 w-[552px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Membership Allowed</p>
    </div>
  );
}

function Icon14() {
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

function Button11() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon14 />
      </div>
    </div>
  );
}

function Icon15() {
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

function Button12() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon15 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[584px] opacity-0 top-0 w-[52px]" data-name="Container">
      <Button11 />
      <Button12 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Icon13 />
      <Text4 />
      <Container16 />
    </div>
  );
}

function Icon16() {
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

function Text5() {
  return (
    <div className="absolute h-[24px] left-[24px] top-0 w-[552px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">{`Apply knowledge through practical  projects`}</p>
    </div>
  );
}

function Icon17() {
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

function Button13() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon17 />
      </div>
    </div>
  );
}

function Icon18() {
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

function Button14() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[584px] opacity-0 top-0 w-[52px]" data-name="Container">
      <Button13 />
      <Button14 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Icon16 />
      <Text5 />
      <Container17 />
    </div>
  );
}

function Icon19() {
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

function Text6() {
  return (
    <div className="absolute h-[24px] left-[24px] top-0 w-[552px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Build real-world applications with confidence</p>
    </div>
  );
}

function Icon20() {
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

function Button15() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon20 />
      </div>
    </div>
  );
}

function Icon21() {
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

function Button16() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[584px] opacity-0 top-0 w-[52px]" data-name="Container">
      <Button15 />
      <Button16 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Icon19 />
      <Text6 />
      <Container18 />
    </div>
  );
}

function Icon22() {
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

function Text7() {
  return (
    <div className="absolute h-[24px] left-[24px] top-0 w-[552px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Master advanced techniques and best practices</p>
    </div>
  );
}

function Icon23() {
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

function Button17() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[24px]">
        <Icon23 />
      </div>
    </div>
  );
}

function Icon24() {
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

function Button18() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-center justify-center relative w-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[24px] items-start left-[584px] opacity-0 top-0 w-[52px]" data-name="Container">
      <Button17 />
      <Button18 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="List Item">
      <Icon22 />
      <Text7 />
      <Container19 />
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

function Input() {
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

function Icon25() {
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

function Button19() {
  return (
    <div className="bg-white h-[32px] opacity-50 relative rounded-[8px] shrink-0 w-[70.391px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[70.391px]">
        <Icon25 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[33px] not-italic text-[14px] text-neutral-950 text-nowrap top-[6px] tracking-[-0.1504px] whitespace-pre">Add</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Button19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[242px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[242px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container15 />
          <List />
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function Icon26() {
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

function Button20() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[150.328px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[150.328px]">
        <Icon26 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-neutral-950 text-nowrap top-[8px] tracking-[-0.1504px] whitespace-pre">Regenerate All</p>
      </div>
    </div>
  );
}

function Icon27() {
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

function Button21() {
  return (
    <div className="bg-[#420d74] h-[36px] relative rounded-[8px] shrink-0 w-[197.578px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[197.578px]">
        <Icon27 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[40px] not-italic text-[14px] text-nowrap text-white top-[8px] tracking-[-0.1504px] whitespace-pre">Looks Good, Continue</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[53px] items-start justify-end pb-0 pt-[17px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button20 />
      <Button21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[571px] items-start relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container14 />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[619px] items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-white h-[797px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] h-[797px] items-start pb-px pt-[25px] px-[25px] relative w-full">
          <Container8 />
          <Paragraph2 />
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[30.063px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[30.063px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-nowrap whitespace-pre">16:14</p>
      </div>
    </div>
  );
}

function Icon28() {
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

function Button22() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-0 rounded-[4px] top-0 w-[32px]" data-name="Button">
      <Icon28 />
    </div>
  );
}

function Icon29() {
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

function Button23() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[36px] rounded-[4px] top-0 w-[32px]" data-name="Button">
      <Icon29 />
    </div>
  );
}

function Container26() {
  return <div className="absolute bg-gray-200 h-[16px] left-[76px] top-[6px] w-px" data-name="Container" />;
}

function Icon30() {
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

function Button24() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[85px] rounded-[4px] top-0 w-[32px]" data-name="Button">
      <Icon30 />
    </div>
  );
}

function Icon31() {
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

function Button25() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-center left-[121px] rounded-[4px] top-0 w-[32px]" data-name="Button">
      <Icon31 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[28px] opacity-0 relative shrink-0 w-[153px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[153px]">
        <Button22 />
        <Button23 />
        <Container26 />
        <Button24 />
        <Button25 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[28px] items-center justify-between px-[4px] py-0 relative w-full">
          <Paragraph4 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[833px] items-start relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container28 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px mr-[-131px] relative shrink-0">
      <Frame6 />
      <Container29 />
    </div>
  );
}

function Container30() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-start flex flex-wrap gap-[15px] items-start pl-0 pr-[131px] py-0 relative w-full">
        <Frame7 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[12px] h-[119px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container30 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[83px] items-start relative shrink-0 w-full">
      <Container31 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[24px] py-0 relative w-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[22px] h-[972px] items-end left-0 top-[-329px] w-[683px]">
      <Frame5 />
      <Frame4 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-[972px] overflow-clip relative shrink-0 w-full">
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[794px] relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[794px] items-end overflow-clip relative rounded-[inherit] w-full">
        <Container1 />
        <Frame8 />
      </div>
    </div>
  );
}

function Icon32() {
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

function Button26() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[26px] left-0 rounded-[8px] top-0 w-[88.836px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[43px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">Add a space</p>
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[26px] left-[96.84px] rounded-[8px] top-0 w-[118.875px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[58.5px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">Customize theme</p>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[26px] left-[223.71px] rounded-[8px] top-0 w-[87.141px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[43.5px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">Set up rules</p>
    </div>
  );
}

function Button29() {
  return (
    <div className="absolute bg-white border border-gray-200 border-solid h-[26px] left-[318.85px] rounded-[8px] top-0 w-[106.859px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[52.5px] not-italic text-[12px] text-center text-neutral-950 text-nowrap top-[5px] translate-x-[-50%] whitespace-pre">Invite members</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 grow h-[26px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[26px] relative w-full">
        <Button26 />
        <Button27 />
        <Button28 />
        <Button29 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[8px] h-[30px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Icon32 />
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-gray-50 h-[47px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[47px] items-start pb-px pt-[8px] px-[16px] relative w-full">
          <Container33 />
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

function Icon33() {
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

function Button30() {
  return (
    <div className="absolute bg-[#420d74] left-[614px] opacity-50 rounded-[8px] size-[32px] top-[40px]" data-name="Button">
      <Icon33 />
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Container">
      <Textarea1 />
      <Button30 />
    </div>
  );
}

function Icon34() {
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

function Button31() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon34 />
      </div>
    </div>
  );
}

function Icon35() {
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

function Button32() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[28px]">
        <Icon35 />
      </div>
    </div>
  );
}

function Icon36() {
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

function Button33() {
  return (
    <div className="basis-0 grow h-[28px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-full">
        <Icon36 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[12px] text-neutral-950 text-nowrap top-[7px] whitespace-pre">Templates</p>
      </div>
    </div>
  );
}

function Icon37() {
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

function Button34() {
  return (
    <div className="h-[28px] relative rounded-[8px] shrink-0 w-[87.891px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[87.891px]">
        <Icon37 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[32px] not-italic text-[#420d74] text-[12px] text-nowrap top-[7px] whitespace-pre">Enhance</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[28px] relative shrink-0 w-[252.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[28px] items-center relative w-[252.172px]">
        <Button31 />
        <Button32 />
        <Button33 />
        <Button34 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[42.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[42.172px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-px whitespace-pre">1 tokens</p>
      </div>
    </div>
  );
}

function Kbd() {
  return (
    <div className="bg-gray-100 h-[22px] relative rounded-[4px] shrink-0 w-[21.227px]" data-name="Kbd">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] relative w-[21.227px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[7px] not-italic text-[#99a1af] text-[12px] text-nowrap top-[4px] whitespace-pre">⌘</p>
      </div>
    </div>
  );
}

function Kbd1() {
  return (
    <div className="basis-0 bg-gray-100 grow h-[22px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Kbd">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[7px] not-italic text-[#99a1af] text-[12px] text-nowrap top-[4px] whitespace-pre">↵</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[22px] relative shrink-0 w-[46.453px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center relative w-[46.453px]">
        <Kbd />
        <Kbd1 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[22px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[22px] items-center relative">
        <Text8 />
        <Container37 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Container38 />
    </div>
  );
}

function Icon38() {
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

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[14px] items-start left-[14.63px] top-px w-[18.883px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#420d74] text-[12px] text-nowrap whitespace-pre">Tip:</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[32px] left-[29px] top-[9px] w-[429px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#420d74] text-[12px] text-nowrap top-px whitespace-pre">💡</p>
      <Text9 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-[42px] not-italic text-[#3e3e3e] text-[12px] top-px w-[428px]">{`Be specific about what you want. Example: "Generate 5 modules for a Python course targeting beginners"`}</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#fcf7ff] h-[50px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#fcf7ff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon38 />
      <Paragraph5 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-start pb-[18px] pt-0 px-0 relative shrink-0 w-full">
      <Container35 />
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-px px-0 relative w-full">
        <Container34 />
        <Container41 />
      </div>
    </div>
  );
}

export default function RightPanel() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start justify-between pl-px pr-0 py-0 relative size-full" data-name="RightPanel">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Frame3 />
      <Container42 />
    </div>
  );
}