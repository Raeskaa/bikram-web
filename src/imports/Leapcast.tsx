import svgPaths from "./svg-opqsx4gsel";

function Heading() {
  return (
    <div className="content-stretch flex h-[24px] items-center relative shrink-0 w-full" data-name="Heading 2">
      <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">Product Team Sync</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#83827d] text-[14px] top-px w-[166px]">6 participants • abc-def-ghi</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[44px] relative shrink-0 w-[166px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p28f18a00} id="Vector" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[32px] relative rounded-[2px] shrink-0 w-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[2px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#faf9f5] h-[69px] relative shrink-0 w-[1385px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#dad9d4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-px pt-0 px-[16px] relative size-full">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p405f80} id="Vector" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MeetingRoom() {
  return (
    <div className="h-[20px] relative shrink-0 w-[29.578px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[15.5px] text-[#83827d] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Chat</p>
      </div>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] h-[29px] items-center justify-center justify-self-stretch p-px relative rounded-[8px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon2 />
      <MeetingRoom />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8.66667 11.3333V3.33333" id="Vector_3" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 11.3333V9.33333" id="Vector_4" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MeetingRoom1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[30.352px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[15px] text-[#3d3929] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Polls</p>
      </div>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="[grid-area:1_/_2] bg-[rgba(180,178,167,0.3)] h-[29px] justify-self-stretch relative rounded-[8px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#b4b2a7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pl-px pr-[1.008px] py-px relative size-full">
          <Icon3 />
          <MeetingRoom1 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p36436880} id="Vector_2" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1f197700} id="Vector_3" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MeetingRoom2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[43.594px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[22px] text-[#83827d] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">People</p>
      </div>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="[grid-area:1_/_3] content-stretch flex gap-[8px] h-[29px] items-center justify-center justify-self-stretch p-px relative rounded-[8px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon4 />
      <MeetingRoom2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_169_480)" id="Icon">
          <path d="M8 12V3.33333" id="Vector" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b97c700} id="Vector_2" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1b2dac00} id="Vector_3" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p721500} id="Vector_4" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p32eac0} id="Vector_5" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p20a84200} id="Vector_6" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1c451600} id="Vector_7" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2e809100} id="Vector_8" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_169_480">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MeetingRoom3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[13.234px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[7px] text-[#83827d] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">AI</p>
      </div>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="[grid-area:1_/_4] content-stretch flex gap-[8px] h-[29px] items-center justify-center justify-self-stretch p-px relative rounded-[8px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon5 />
      <MeetingRoom3 />
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#f5f2eb] h-[36px] relative shrink-0 w-[319px]" data-name="Tab List">
      <div aria-hidden="true" className="absolute border-[#dad9d4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] px-[3px] py-[3.5px] relative size-full">
        <PrimitiveButton />
        <PrimitiveButton1 />
        <PrimitiveButton2 />
        <PrimitiveButton3 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#141413] text-[16px] top-[0.5px] w-[176px]">Which feature should we prioritize?</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#eceae4] h-[22px] relative rounded-[2px] shrink-0 w-[50.68px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#535146] text-[12px] text-nowrap">Active</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function MeetingRoom4() {
  return (
    <div className="h-[48px] relative shrink-0 w-[253px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Heading1 />
        <Badge />
      </div>
    </div>
  );
}

function Container2() {
  return <div className="absolute bg-[rgba(201,100,66,0.1)] h-[44px] left-px top-px w-[125.5px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[68.492px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#141413] text-[14px] text-nowrap top-px">Mobile app</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.789px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#83827d] text-[14px] text-nowrap top-px">5</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#83827d] text-[12px] top-px w-[25px]">50%</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[13px] top-[13px] w-[227px]" data-name="Container">
      <Text />
      <Container3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(245,242,235,0.2)] h-[46px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container2 />
        <Container4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dad9d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-[rgba(201,100,66,0.1)] h-[44px] left-px top-px w-[75.297px]" data-name="Container" />;
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#141413] text-[14px] text-nowrap top-px">API access</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.789px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#83827d] text-[14px] text-nowrap top-px">3</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#83827d] text-[12px] top-px w-[25px]">30%</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text4 />
        <Text5 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[13px] top-[13px] w-[227px]" data-name="Container">
      <Text3 />
      <Container6 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[rgba(245,242,235,0.2)] h-[46px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container5 />
        <Container7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dad9d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[rgba(201,100,66,0.1)] h-[44px] left-px top-px w-[50.195px]" data-name="Container" />;
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[56.023px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#141413] text-[14px] text-nowrap top-px">Analytics</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.789px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#83827d] text-[14px] text-nowrap top-px">2</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#83827d] text-[12px] top-px w-[25px]">20%</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.813px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text7 />
        <Text8 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[13px] top-[13px] w-[227px]" data-name="Container">
      <Text6 />
      <Container9 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(245,242,235,0.2)] h-[46px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container8 />
        <Container10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#dad9d4] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function MeetingRoom5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[253px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Button2 />
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[#faf9f5] h-[276px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(218,217,212,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-start pl-[17px] pr-px py-[17px] relative size-full">
          <MeetingRoom4 />
          <MeetingRoom5 />
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(180,178,167,0.3)] h-[36px] relative rounded-[2px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#b4b2a7] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[143.87px] text-[#3d3929] text-[14px] text-center text-nowrap top-[9px] translate-x-[-50%]">Create Poll</p>
    </div>
  );
}

function MeetingRoom6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[328px] items-start relative shrink-0 w-full" data-name="MeetingRoom">
      <Card />
      <Button5 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[319px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-0 pt-[16px] px-[16px] relative rounded-[inherit] size-full">
        <MeetingRoom6 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[319px]" data-name="Primitive.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <TabList />
        <TabPanel />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-[#faf9f5] content-stretch flex flex-col h-[833px] items-start left-[1065px] pl-px pr-0 py-0 top-0 w-[320px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dad9d4] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <PrimitiveDiv />
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[64px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">JD</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-[135.16px] overflow-clip rounded-[1.67772e+07px] size-[64px] top-[164.25px]" data-name="Primitive.span">
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 bg-[rgba(250,249,245,0.8)] grow h-[28px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-[8px] text-[#3d3929] text-[14px] text-nowrap top-[5px]">John Doe</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#eceae4] h-[22px] relative rounded-[2px] shrink-0 w-[42.68px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#535146] text-[12px] text-nowrap">Host</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[12px] top-[352.5px] w-[126.617px]" data-name="Container">
      <Text10 />
      <Badge1 />
    </div>
  );
}

function Container13() {
  return <div className="absolute bg-[rgba(255,255,255,0)] h-[392.5px] left-0 rounded-[8px] shadow-[0px_0px_0px_4px_#faf9f5,0px_0px_0px_8px_rgba(201,100,66,0.5)] top-0 w-[334.328px]" data-name="Container" />;
}

function Container14() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[394.5px] left-0 overflow-clip rounded-[8px] top-0 w-[336.328px]" data-name="Container" style={{ backgroundImage: "linear-gradient(130.449deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Text11() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[64px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">JS</p>
      </div>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="absolute content-stretch flex items-start left-[135.16px] overflow-clip rounded-[1.67772e+07px] size-[64px] top-[164.25px]" data-name="Primitive.span">
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 bg-[rgba(250,249,245,0.8)] grow h-[28px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-[8px] text-[#3d3929] text-[14px] text-nowrap top-[5px]">Jane Smith</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#eceae4] h-[22px] relative rounded-[2px] shrink-0 w-[62.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#535146] text-[12px] text-nowrap">Co-Host</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[12px] top-[352.5px] w-[156.055px]" data-name="Container">
      <Text12 />
      <Badge2 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[394.5px] left-[348.33px] overflow-clip rounded-[8px] top-0 w-[336.336px]" data-name="Container" style={{ backgroundImage: "linear-gradient(130.45deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan1 />
      <Container15 />
    </div>
  );
}

function Text13() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[64px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">BJ</p>
      </div>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="absolute content-stretch flex items-start left-[135.16px] overflow-clip rounded-[1.67772e+07px] size-[64px] top-[164.25px]" data-name="Primitive.span">
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="basis-0 bg-[rgba(250,249,245,0.8)] grow h-[28px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-[8px] text-[#3d3929] text-[14px] text-nowrap top-[5px]">Bob Johnson</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#eceae4] h-[22px] relative rounded-[2px] shrink-0 w-[70.031px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#535146] text-[12px] text-nowrap">Presenter</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[12px] top-[352.5px] w-[175.766px]" data-name="Container">
      <Text14 />
      <Badge3 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[394.5px] left-[696.66px] overflow-clip rounded-[8px] top-0 w-[336.336px]" data-name="Container" style={{ backgroundImage: "linear-gradient(130.45deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan2 />
      <Container17 />
    </div>
  );
}

function Text15() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[64px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">AB</p>
      </div>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="absolute content-stretch flex items-start left-[135.16px] overflow-clip rounded-[1.67772e+07px] size-[64px] top-[164.25px]" data-name="Primitive.span">
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="bg-[rgba(250,249,245,0.8)] h-[28px] relative rounded-[4px] shrink-0 w-[89.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-[8px] text-[#3d3929] text-[14px] text-nowrap top-[5px]">Alice Brown</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[79.17%]" data-name="Vector">
        <div className="absolute inset-[-33.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 3">
            <path d="M0.583333 0.583333V2.33333" id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.41%_37.5%_61.08%_38.83%]" data-name="Vector">
        <div className="absolute inset-[-13.66%_-17.61%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 6">
            <path d={svgPaths.p3929ed00} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_29.37%_20.83%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-8.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 7">
            <path d={svgPaths.p259c5500} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_20.83%_44.88%_78.71%]" data-name="Vector">
        <div className="absolute inset-[-30.96%_-909.09%_-30.97%_-909.24%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d={svgPaths.p23ece00} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <path d={svgPaths.p1d50600} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_41.17%_37.51%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-19.53%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p2e3094c0} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[rgba(250,249,245,0.8)] relative rounded-[1.67772e+07px] shrink-0 size-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[6px] px-[6px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-between left-[12px] top-[352.5px] w-[310.328px]" data-name="Container">
      <Text16 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[394.5px] left-0 overflow-clip rounded-[8px] top-[406.5px] w-[336.328px]" data-name="Container" style={{ backgroundImage: "linear-gradient(130.449deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan3 />
      <Container20 />
    </div>
  );
}

function Text17() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[64px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">CD</p>
      </div>
    </div>
  );
}

function PrimitiveSpan4() {
  return (
    <div className="absolute content-stretch flex items-start left-[135.16px] overflow-clip rounded-[1.67772e+07px] size-[64px] top-[164.25px]" data-name="Primitive.span">
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[rgba(250,249,245,0.8)] h-[28px] left-[12px] rounded-[4px] top-[352.5px] w-[99.25px]" data-name="Text">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-[8px] text-[#3d3929] text-[14px] text-nowrap top-[5px]">Charlie Davis</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[394.5px] left-[348.33px] overflow-clip rounded-[8px] top-[406.5px] w-[336.336px]" data-name="Container" style={{ backgroundImage: "linear-gradient(130.45deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan4 />
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[64px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">EW</p>
      </div>
    </div>
  );
}

function PrimitiveSpan5() {
  return (
    <div className="absolute content-stretch flex items-start left-[135.16px] overflow-clip rounded-[1.67772e+07px] size-[64px] top-[164.25px]" data-name="Primitive.span">
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="basis-0 bg-[rgba(250,249,245,0.8)] grow h-[28px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-[8px] text-[#3d3929] text-[14px] text-nowrap top-[5px]">Eve Wilson</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#eceae4] h-[22px] relative rounded-[2px] shrink-0 w-[54.469px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#535146] text-[12px] text-nowrap">Viewer</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[28px] relative shrink-0 w-[148.492px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text20 />
        <Badge4 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[79.17%]" data-name="Vector">
        <div className="absolute inset-[-33.33%_-0.58px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 3">
            <path d="M0.583333 0.583333V2.33333" id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.41%_37.5%_61.08%_38.83%]" data-name="Vector">
        <div className="absolute inset-[-13.66%_-17.61%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 6">
            <path d={svgPaths.p3929ed00} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_29.37%_20.83%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-11.11%_-8.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 7">
            <path d={svgPaths.p259c5500} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_20.83%_44.88%_78.71%]" data-name="Vector">
        <div className="absolute inset-[-30.96%_-909.09%_-30.97%_-909.24%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d={svgPaths.p23ece00} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <path d={svgPaths.p1d50600} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_41.17%_37.51%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-19.53%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p2e3094c0} id="Vector" stroke="var(--stroke-0, #141413)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[rgba(250,249,245,0.8)] relative rounded-[1.67772e+07px] shrink-0 size-[26px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[6px] px-[6px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center justify-between left-[12px] top-[352.5px] w-[310.336px]" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[394.5px] left-[696.66px] overflow-clip rounded-[8px] top-[406.5px] w-[336.336px]" data-name="Container" style={{ backgroundImage: "linear-gradient(130.45deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan5 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[801px] left-[16px] top-[16px] w-[1033px]" data-name="Container">
      <Container14 />
      <Container16 />
      <Container18 />
      <Container21 />
      <Container22 />
      <Container26 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 12.6667V14.6667" id="Vector" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4f72080} id="Vector_2" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1c53e800} id="Vector_3" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[#eceae4] content-stretch flex items-center justify-center left-0 rounded-[1.67772e+07px] size-[48px] top-0" data-name="Button">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d08dd80} id="Vector" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e94b080} id="Vector_2" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[#eceae4] content-stretch flex items-center justify-center left-[56px] rounded-[1.67772e+07px] size-[48px] top-0" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p7ad6800} id="Vector" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 14H10.6667" id="Vector_2" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333V14" id="Vector_3" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#eceae4] content-stretch flex items-center justify-center left-[112px] rounded-[1.67772e+07px] size-[48px] top-0" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Container28() {
  return <div className="absolute bg-[#dad9d4] h-[32px] left-[176px] top-[8px] w-px" data-name="Container" />;
}

function Icon11() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_169_438)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_169_438">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[#eceae4] h-[40px] left-[193px] rounded-[1.67772e+07px] top-[4px] w-[101.133px]" data-name="Button">
      <Icon11 />
      <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[63px] text-[#535146] text-[14px] text-center text-nowrap top-[11px] translate-x-[-50%]">Record</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b6ee540} id="Vector_2" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[#eceae4] h-[40px] left-[302.13px] rounded-[1.67772e+07px] top-[4px] w-[92.586px]" data-name="Button">
      <Icon12 />
      <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[58px] text-[#535146] text-[14px] text-center text-nowrap top-[11px] translate-x-[-50%]">Stage</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_169_432)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p30be9df0} id="Vector_2" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6 6H6.00667" id="Vector_3" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 6H10.0067" id="Vector_4" stroke="var(--stroke-0, #535146)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_169_432">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute bg-[#eceae4] content-stretch flex items-center justify-center left-[402.72px] rounded-[1.67772e+07px] size-[48px] top-0" data-name="Button">
      <Icon13 />
    </div>
  );
}

function Container29() {
  return <div className="absolute bg-[#dad9d4] h-[32px] left-[466.72px] top-[8px] w-px" data-name="Container" />;
}

function Icon14() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_169_475)" id="Icon">
          <path d={svgPaths.p26187580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_169_475">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute bg-[rgba(20,20,19,0.6)] h-[40px] left-[483.72px] rounded-[1.67772e+07px] top-[4px] w-[94.148px]" data-name="Button">
      <Icon14 />
      <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[59.5px] text-[14px] text-center text-nowrap text-white top-[11px] translate-x-[-50%]">Leave</p>
    </div>
  );
}

function MeetingRoom7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[577.867px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button6 />
        <Button7 />
        <Button8 />
        <Container28 />
        <Button9 />
        <Button10 />
        <Button11 />
        <Container29 />
        <Button12 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-[rgba(250,249,245,0.95)] content-stretch flex flex-col h-[74px] items-start left-[230.57px] pl-[13px] pr-px py-[13px] rounded-[8px] top-[735px] w-[603.867px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(218,217,212,0.5)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_8px_10px_-1px_rgba(0,0,0,0.1)]" />
      <MeetingRoom7 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[833px] left-0 top-0 w-[1065px]" data-name="Container">
      <Container27 />
      <Card1 />
    </div>
  );
}

function Container31() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container11 />
        <Container30 />
      </div>
    </div>
  );
}

export default function Leapcast() {
  return (
    <div className="bg-[#faf9f5] content-stretch flex flex-col items-start relative size-full" data-name="Leapcast">
      <Header />
      <Container31 />
    </div>
  );
}