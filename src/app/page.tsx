import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";
interface Props {
  searchParams: Promise<{ admin?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const isAdmin = params.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal isOpen={true} />}
      <section className="remove-scrollbar container m-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-base mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2025 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-1/2 rounded-l-4xl"
      />
    </div>
  );
}
