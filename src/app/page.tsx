import PaginationBar from "@/src/components/PaginationBar";
import ProductCard from "@/src/components/ProductCard";
import { prisma } from "@/src/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/button";

interface HomeProps {
  searchParams: { page: string };
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    // <div className="mt-2 flex flex-col items-center">
    //   {currentPage === 1 && (
    //     <div className="mb-8">
    //       <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
    //         <Image
    //           src={products[0].imageUrl}
    //           alt={products[0].name}
    //           width={400}
    //           height={800}
    //           priority
    //           className="rounded-md object-cover w-full h-[300px]"
    //         />
    //         <div>
    //           <div className="text-black">
    //             <h1 className="text-3xl font-bold mb-2">{products[0].name}</h1>
    //             <p className="text-sm mb-4">{products[0].description}</p>
    //             <Link
    //               href={"/products/" + products[0].id}
    //               className="btn-primary btn"
    //             >
    //               Check it out
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    //     {(currentPage === 1 ? products.slice(1) : products).map((product) => (
    //       <ProductCard product={product} key={product.id} />
    //     ))}
    //   </div>

    //   <div className="mt-5">
    //     {totalPages > 1 && (
    //       <PaginationBar currentPage={currentPage} totalPages={totalPages} />
    //     )}
    //   </div>
    // </div>

    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      {currentPage === 1 && (
        <div className="py-12 flex flex-wrap justify-between md:mb-0">
          <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
            <h1 className="mb-4 text-4xl font-bold dark:text-white text-black sm:text-5xl md:mb-8 md:text-6xl">
              {products[1].name}
            </h1>
            <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
              {products[1].description}
            </p>
          </div>

          <div className="mb-12 flex w-full h-fit sm:h-[450px] md:mb-16 lg:w-2/3">
            <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
              <Image
                src={products[0].imageUrl}
                alt={products[0].name}
                className="h-full w-full object-cover object-center"
                width={500}
                height={500}
                priority
              />
            </div>

            <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
              <Image
                src={products[1].imageUrl}
                alt={products[1].name}
                className="h-full w-full object-cover object-center"
                priority
                width={500}
                height={500}
              />
            </div>
            <Button variant="solid">Click Me!</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      <div className="mt-5">
        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </section>
  );
}
