"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import { productFormSchema } from "@/schemas/schema";
import { Productdata } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProductForm() {
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Productdata>({ resolver: zodResolver(productFormSchema) });

  const handleUploadSuccess = (response: any) => {
    console.log(response.url)
    setImageUrl(response.url);
  };

  const onSubmit = async (formData: Productdata) => {
    console.log("submitted")
    const { name, price, description } = formData;

    try {
      productFormSchema.parse(formData);

      const response = await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify({ name, price, description, imageUrl }),
      });

      if (response.ok) {
        toast.success("Product successfully added!");
        console.log({ response });
      } else {
        toast.error("Product upload failed!");
        console.error({ response });
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mx-auto max-w-md mt-10">
          <Input type="text" label="Product name" {...register("name")} />
          <Input type="number" label="Price" {...register("price")} />
          <Input type="text" label="Description" {...register("description")} />
          <h1>Upload an image</h1>
          <CldUploadWidget
            uploadPreset="qwut2dzj"
            options={{
              sources: ["local"],
              multiple: false,
            }}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <Button color="primary" onClick={() => open()}>
                Upload
              </Button>
            )}
          </CldUploadWidget>
          <Button className="text-center mb-5" type="submit">
            Upload a Product
          </Button>
        </div>
      </form>
    </>
  );
}
