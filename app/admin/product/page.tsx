"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import { productFormSchema } from "@/schemas/schema";
import { Productdata } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function ProductForm() {
  const [value, setValue] = React.useState("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Productdata>({ resolver: zodResolver(productFormSchema) });

  const handleUploadSuccess = (response: any) => {
    console.log(response.url);
    setImageUrl(response.url);
  };

  const onSubmit = async (formData: Productdata) => {
    console.log("submitted");
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
      <div className="flex w-full flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <Input
              color="warning"
              type="text"
              label="Product name"
            />
            <Input
              type="number"
              label="Price"

            />
            <Textarea
              value={value}
              onValueChange={setValue}
              isInvalid={value.length > 10}
              variant="bordered"
              placeholder="Enter your description"
              type="text"
              {...register("description")}
              label="Description"
              errorMessage={
                value.length > 10
                  ? "The description should be maximum 10 characters long."
                  : ""
              }
            />
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
                <Button color="primary" onClick={() => open()} className="bg-eggplant">
                  Upload
                </Button>
              )}
            </CldUploadWidget>
            <Button className="text-center mb-5 bg-violet-ultra text-white" type="submit">
              Upload a Product
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
