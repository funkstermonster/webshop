import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1 font.classname">
        <Image src="/logo.svg" alt="funkster" height="24" width="24"/>
      </div>
    </div>
  );
};
