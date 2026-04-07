import svgPaths from "./svg-rf9fr2yjfr";

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
          <path d={svgPaths.p405f80} id="Vector" stroke="var(--stroke-0, #3D3929)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MeetingRoom() {
  return (
    <div className="h-[20px] relative shrink-0 w-[29.578px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[15.5px] text-[#3d3929] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Chat</p>
      </div>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(180,178,167,0.3)] content-stretch flex gap-[8px] h-[29px] items-center justify-center justify-self-stretch p-px relative rounded-[8px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#b4b2a7] border-solid inset-0 pointer-events-none rounded-[8px]" />
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
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8.66667 11.3333V3.33333" id="Vector_3" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 11.3333V9.33333" id="Vector_4" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function MeetingRoom1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[30.352px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[15px] text-[#83827d] text-[14px] text-center text-nowrap top-px translate-x-[-50%]">Polls</p>
      </div>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="[grid-area:1_/_2] h-[29px] justify-self-stretch relative rounded-[8px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
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

function Input() {
  return (
    <div className="basis-0 bg-[rgba(180,178,167,0.3)] grow h-[36px] min-h-px min-w-px relative rounded-[2px] shrink-0" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#83827d] text-[14px] text-nowrap">Send a message...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b4b2a7] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_169_705)" id="Icon">
          <path d={svgPaths.p9b47a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p15e62a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_169_705">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#c96442] h-[32px] relative rounded-[2px] shrink-0 w-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Button2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[69px] items-start left-0 pb-0 pt-[17px] px-[16px] top-[720px] w-[319px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dad9d4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container2 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.039px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#3d3929] text-[14px] text-nowrap top-px">Jane Smith</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.695px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#83827d] text-[12px] text-nowrap top-px">2:30 PM</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#83827d] text-[14px] text-nowrap top-px">Great presentation!</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Paragraph1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#3d3929] text-[14px] text-nowrap top-px">Bob Johnson</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.695px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#83827d] text-[12px] text-nowrap top-px">2:31 PM</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#83827d] text-[14px] text-nowrap top-px">Thanks! Glad you liked it.</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Paragraph2 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#3d3929] text-[14px] text-nowrap top-px">Alice Brown</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[44.695px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#83827d] text-[12px] text-nowrap top-px">2:32 PM</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#83827d] text-[14px] text-nowrap top-px">Can you share those slides?</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[44px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Paragraph3 />
    </div>
  );
}

function MeetingRoom4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[164px] items-start relative shrink-0 w-full" data-name="MeetingRoom">
      <Container5 />
      <Container7 />
      <Container9 />
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute content-stretch flex flex-col h-[688px] items-start left-[16px] overflow-clip top-[16px] w-[287px]" data-name="Primitive.div">
      <MeetingRoom4 />
    </div>
  );
}

function MeetingRoom5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[319px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container3 />
        <PrimitiveDiv />
      </div>
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[319px]" data-name="Primitive.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <TabList />
        <MeetingRoom5 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[#faf9f5] content-stretch flex flex-col h-[833px] items-start left-[1065px] pl-px pr-0 py-0 top-0 w-[320px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dad9d4] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <PrimitiveDiv1 />
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">JS</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-[79.09px] overflow-clip rounded-[1.67772e+07px] size-[40px] top-[35.3px]" data-name="Primitive.span">
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[rgba(250,249,245,0.8)] h-[20px] left-[8px] overflow-clip rounded-[4px] top-[82.61px] w-[42.023px]" data-name="Text">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#3d3929] text-[12px] text-nowrap top-[3px]">Jane</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[112.609px] left-0 overflow-clip rounded-[4px] top-0 w-[200.195px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan />
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">BJ</p>
      </div>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="absolute content-stretch flex items-start left-[79.1px] overflow-clip rounded-[1.67772e+07px] size-[40px] top-[35.3px]" data-name="Primitive.span">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[rgba(250,249,245,0.8)] h-[20px] left-[8px] overflow-clip rounded-[4px] top-[82.61px] w-[37.352px]" data-name="Text">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#3d3929] text-[12px] text-nowrap top-[3px]">Bob</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[112.609px] left-[208.2px] overflow-clip rounded-[4px] top-0 w-[200.203px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.643deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan1 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">AB</p>
      </div>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="absolute content-stretch flex items-start left-[79.09px] overflow-clip rounded-[1.67772e+07px] size-[40px] top-[35.3px]" data-name="Primitive.span">
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="bg-[rgba(250,249,245,0.8)] h-[20px] relative rounded-[4px] shrink-0 w-[42.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#3d3929] text-[12px] text-nowrap top-[3px]">Alice</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_169_712)" id="Icon">
          <path d="M6 9.5V11" id="Vector" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p252d9180} id="Vector_2" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p12663198} id="Vector_3" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p104b3580} id="Vector_4" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 1L11 11" id="Vector_5" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p49edc28} id="Vector_6" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_169_712">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[8px] top-[82.61px] w-[182.195px]" data-name="Container">
      <Text11 />
      <Icon7 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[112.609px] left-[416.4px] overflow-clip rounded-[4px] top-0 w-[200.195px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan2 />
      <Container13 />
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">CD</p>
      </div>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="absolute content-stretch flex items-start left-[79.1px] overflow-clip rounded-[1.67772e+07px] size-[40px] top-[35.3px]" data-name="Primitive.span">
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[rgba(250,249,245,0.8)] h-[20px] left-[8px] overflow-clip rounded-[4px] top-[82.61px] w-[54.016px]" data-name="Text">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#3d3929] text-[12px] text-nowrap top-[3px]">Charlie</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[112.609px] left-[624.59px] overflow-clip rounded-[4px] top-0 w-[200.203px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.643deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan3 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="basis-0 bg-[#f5f2eb] grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#3d3929] text-[16px] text-nowrap">EW</p>
      </div>
    </div>
  );
}

function PrimitiveSpan4() {
  return (
    <div className="absolute content-stretch flex items-start left-[79.09px] overflow-clip rounded-[1.67772e+07px] size-[40px] top-[35.3px]" data-name="Primitive.span">
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="bg-[rgba(250,249,245,0.8)] h-[20px] relative rounded-[4px] shrink-0 w-[36.68px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[16px] left-[8px] text-[#3d3929] text-[12px] text-nowrap top-[3px]">Eve</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_169_691)" id="Icon">
          <path d="M6 9.5V11" id="Vector" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pdff24c0} id="Vector_2" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p12663198} id="Vector_3" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p104b3580} id="Vector_4" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 1L11 11" id="Vector_5" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p49edc28} id="Vector_6" stroke="var(--stroke-0, #83827D)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_169_691">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center justify-between left-[8px] top-[82.61px] w-[182.195px]" data-name="Container">
      <Text15 />
      <Icon8 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[112.609px] left-[832.8px] overflow-clip rounded-[4px] top-0 w-[200.195px]" data-name="Container" style={{ backgroundImage: "linear-gradient(150.642deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <PrimitiveSpan4 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[120.609px] left-0 overflow-clip top-[680.39px] w-[1033px]" data-name="Container">
      <Container11 />
      <Container12 />
      <Container14 />
      <Container15 />
      <Container17 />
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="User">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="User">
          <path d={svgPaths.p1be5eb00} id="Vector" stroke="var(--stroke-0, #C96442)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d={svgPaths.p2439f500} id="Vector_2" stroke="var(--stroke-0, #C96442)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[rgba(201,100,66,0.1)] content-stretch flex items-center justify-center left-0 rounded-[1.67772e+07px] size-[96px] top-0" data-name="Container">
      <User />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[24px] left-0 top-[112px] w-[96px]" data-name="Heading 3">
      <p className="absolute font-['Schibsted_Grotesk:Regular',sans-serif] font-normal leading-[24px] left-[47.75px] text-[#3d3929] text-[16px] text-center text-nowrap top-[0.5px] translate-x-[-50%]">John Doe</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#c96442] border border-[rgba(0,0,0,0)] border-solid h-[22px] left-[12.98px] overflow-clip rounded-[2px] top-[144px] w-[70.031px]" data-name="Badge">
      <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[16px] left-[34px] text-[12px] text-center text-nowrap text-white top-[3px] translate-x-[-50%]">Presenter</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[166px] left-[467.5px] top-[250.2px] w-[96px]" data-name="Container">
      <Container19 />
      <Heading1 />
      <Badge />
    </div>
  );
}

function Container21() {
  return <div className="absolute bg-[rgba(255,255,255,0)] h-[666.391px] left-0 rounded-[8px] shadow-[0px_0px_0px_4px_#faf9f5,0px_0px_0px_8px_rgba(201,100,66,0.5)] top-0 w-[1031px]" data-name="Container" />;
}

function Container22() {
  return (
    <div className="absolute border border-[#dad9d4] border-solid h-[668.391px] left-0 overflow-clip rounded-[8px] top-0 w-[1033px]" data-name="Container" style={{ backgroundImage: "linear-gradient(147.096deg, rgba(245, 242, 235, 0.3) 0%, rgba(245, 242, 235, 0.1) 100%)" }}>
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[801px] left-[16px] top-[16px] w-[1033px]" data-name="Container">
      <Container18 />
      <Container22 />
    </div>
  );
}

function Icon9() {
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

function Button3() {
  return (
    <div className="absolute bg-[#eceae4] content-stretch flex items-center justify-center left-0 rounded-[1.67772e+07px] size-[48px] top-0" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Icon10() {
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

function Button4() {
  return (
    <div className="absolute bg-[#eceae4] content-stretch flex items-center justify-center left-[56px] rounded-[1.67772e+07px] size-[48px] top-0" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Icon11() {
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

function Button5() {
  return (
    <div className="absolute bg-[#eceae4] content-stretch flex items-center justify-center left-[112px] rounded-[1.67772e+07px] size-[48px] top-0" data-name="Button">
      <Icon11 />
    </div>
  );
}

function Container24() {
  return <div className="absolute bg-[#dad9d4] h-[32px] left-[176px] top-[8px] w-px" data-name="Container" />;
}

function Icon12() {
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

function Button6() {
  return (
    <div className="absolute bg-[#eceae4] h-[40px] left-[193px] rounded-[1.67772e+07px] top-[4px] w-[101.133px]" data-name="Button">
      <Icon12 />
      <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[63px] text-[#535146] text-[14px] text-center text-nowrap top-[11px] translate-x-[-50%]">Record</p>
    </div>
  );
}

function Icon13() {
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

function Button7() {
  return (
    <div className="absolute bg-[#eceae4] h-[40px] left-[302.13px] rounded-[1.67772e+07px] top-[4px] w-[82.453px]" data-name="Button">
      <Icon13 />
      <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[53px] text-[#535146] text-[14px] text-center text-nowrap top-[11px] translate-x-[-50%]">Grid</p>
    </div>
  );
}

function Icon14() {
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

function Button8() {
  return (
    <div className="absolute bg-[#eceae4] content-stretch flex items-center justify-center left-[392.59px] rounded-[1.67772e+07px] size-[48px] top-0" data-name="Button">
      <Icon14 />
    </div>
  );
}

function Container25() {
  return <div className="absolute bg-[#dad9d4] h-[32px] left-[456.59px] top-[8px] w-px" data-name="Container" />;
}

function Icon15() {
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

function Button9() {
  return (
    <div className="absolute bg-[rgba(20,20,19,0.6)] h-[40px] left-[473.59px] rounded-[1.67772e+07px] top-[4px] w-[94.148px]" data-name="Button">
      <Icon15 />
      <p className="absolute font-['Schibsted_Grotesk:Medium',sans-serif] font-medium leading-[20px] left-[59.5px] text-[14px] text-center text-nowrap text-white top-[11px] translate-x-[-50%]">Leave</p>
    </div>
  );
}

function MeetingRoom6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[567.734px]" data-name="MeetingRoom">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button3 />
        <Button4 />
        <Button5 />
        <Container24 />
        <Button6 />
        <Button7 />
        <Button8 />
        <Container25 />
        <Button9 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-[rgba(250,249,245,0.95)] content-stretch flex flex-col h-[74px] items-start left-[235.63px] pl-[13px] pr-px py-[13px] rounded-[8px] top-[735px] w-[593.734px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(218,217,212,0.5)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_8px_10px_-1px_rgba(0,0,0,0.1)]" />
      <MeetingRoom6 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[833px] left-0 top-0 w-[1065px]" data-name="Container">
      <Container23 />
      <Card />
    </div>
  );
}

function Container27() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1385px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container10 />
        <Container26 />
      </div>
    </div>
  );
}

export default function Leapcast() {
  return (
    <div className="bg-[#faf9f5] content-stretch flex flex-col items-start relative size-full" data-name="Leapcast">
      <Header />
      <Container27 />
    </div>
  );
}