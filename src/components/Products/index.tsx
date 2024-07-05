import Image from "next/image";
import { inter } from "@/utils/fonts";
import { CategoryType } from "@/@types/category";

export async function Products() {
  const response = await fetch("http://localhost:3000/api/category/getall", {
    next: {
      revalidate: 2000,
    },
  });

  const products: CategoryType[] = await response.json();

  return (
    <ul className="flex flex-col justify-center gap-8 items-center pb-4">
      {!products && <h2 className="text-white">Sem produtos no momento</h2>}
      {products &&
        products.map((items) => {
          return (
            <li
              className="w-[95%] flex flex-wrap justify-star gap-3"
              key={items.id}
            >
              <div className="w-full flex items-start">
                <h2 className="text-gray-400 text-start font-bold text-[1.2rem]">
                  {items.name}
                </h2>
              </div>
              {items.products.map((item) => {
                return (
                  <button
                    key={item.name}
                    className="w-[180px] h-[14rem] flex 
                    cursor-pointer
                    p-3
                    flex-col
                    justify-between
                    border-[1px] border-stone-950 rounded-2xl"
                  >
                    <div className="w-full flex items-start flex-col gap-2 ">
                      <Image
                        src={item.image_url}
                        width={0}
                        height={0}
                        alt="Discord Nitro Banner"
                        className="rounded-3xl h-32 w-32"
                      />
                      <p className="text-gray-300  font-medium text-sm">
                        {item.name}
                      </p>
                    </div>

                    <div className="flex flex-col text-start">
                      <p className="text-gray-300 flex gap-2 text-sm">
                        {item.price_reals && item.prince_cents && (
                          <span>
                            {"R$ " + item.price_reals + "," + item.prince_cents}
                          </span>
                        )}

                        <span className="text-green-700 e font-medium text-sm">
                          R$ 80% OFF
                        </span>
                      </p>
                      <p style={inter.style} className="text-gray-300 text-sm">
                        estoque: {item.stock}
                      </p>
                    </div>
                  </button>
                );
              })}
            </li>
          );
        })}
    </ul>
  );
}
