'use client'
import { Footer } from "@/components/Footer";
import { Products } from "@/components/Products";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Product() {
  const params = useParams();

  return (
    <div className="h-full">
      <h2 className="text-white text-2xl"> Product with id</h2>
      <Product/>
      <Footer />
    </div>
  );
}
