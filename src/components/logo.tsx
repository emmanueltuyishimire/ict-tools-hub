
import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Image src="/logo.png" alt="ICT Tools Hub Logo" width={36} height={36} />
      <span className="text-xl font-semibold tracking-tight font-headline">
        ICT Tools Hub
      </span>
    </Link>
  );
}
