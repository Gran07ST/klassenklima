import { ZitiertText as ZitiertTextType } from "@/lib/types";

interface Props {
  value: ZitiertTextType;
  className?: string;
}

export default function ZitiertText({ value, className }: Props) {
  return (
    <span className={className}>
      {value.text}
      {value.quelle && (
        <>
          {" "}
          <span className="text-[#8a847a]">{value.quelle}</span>
        </>
      )}
    </span>
  );
}
