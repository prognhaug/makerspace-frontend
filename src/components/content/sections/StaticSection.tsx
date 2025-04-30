import Image from "next/image";
import { Section } from "@/types/content";

export default function StaticSection({
  title,
  content,
  imagePath,
  imageAlt,
  layout,
}: Section) {
  const textColumnOrder = layout === "text-left" ? "order-first" : "order-last";
  const imageColumnOrder =
    layout === "text-left" ? "order-last" : "order-first";

  return (
    <div className="w-full bg-primary-faint py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`flex flex-col space-y-6 text-text ${textColumnOrder}`}
          >
            <h2 className="font-poppins text-3xl font-bold">{title}</h2>
            <p className="font-work-sans">{content}</p>
          </div>
          <div
            className={`flex justify-center md:justify-end ${imageColumnOrder}`}
          >
            <Image
              src={imagePath || "/pictures/textile2.png"}
              alt={imageAlt || "Workshop at Jæren Makerspace"}
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
