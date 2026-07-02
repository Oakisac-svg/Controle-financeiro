import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
};

export function BrandLogo({
  href = "/",
  className,
  imageClassName,
  labelClassName,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      aria-label="FinMb"
      className={cn("landing-logo flex items-center gap-2.5 font-display font-bold", className)}
    >
      <Image
        src="/brand/finmb-logo.png"
        width={56}
        height={56}
        alt=""
        className={cn("landing-logo-mark size-11 shrink-0 object-contain drop-shadow-md", imageClassName)}
      />
      <span className={labelClassName}>FinMb</span>
    </Link>
  );
}
