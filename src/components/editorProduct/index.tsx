import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number } from "zod";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
}

interface EditorProductProps {
  product?: Product;
  onSubmit: (data: Product) => void;
}

const productSchema = object({
  name: string().min(1, "Name is required"),
  price: number().positive("Price must be a positive number"),
  description: string().min(1, "Description is required"),
  image: string().min(1, "Image is required"),
});

const EditorProduct = ({ product, onSubmit }: EditorProductProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

  const [fileName, setFileName] = useState<string>("No file chosen");

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("image", product.image);
    }
  }, [product, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Image size must not exceed 3 MB");
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("No file chosen");
    }
  };

  const onSubmitHandler: SubmitHandler<Product> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-full px-32 rounded-xl p-6 shadow-2xl text-neutral-content bg-base-200"
    >
      <h1 className="text-center text-3xl font-mono mb-5">
        {product ? "Edit Product" : "Create Product"}
      </h1>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Product Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter product name"
            className="input input-primary w-full"
          />
          <p className="mt-1 text-red-300 font-semibold text-sm">
            {errors.name?.message}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            placeholder="Enter price"
            className="input input-primary w-full"
          />
          <p className="mt-1 text-red-300 font-semibold text-sm">
            {errors.price?.message}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter product description"
            className="input input-primary w-full h-28 overflow-y-auto"
          />
          <p className="mt-1 text-red-300 font-semibold text-sm">
            {errors.description?.message}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Upload Image</label>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="fileInput"
              className="btn btn-primary cursor-pointer"
            >
              Browse
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="text-sm text-gray-500">{fileName}</span>
          </div>
          <p className="mt-1 text-red-300 font-semibold text-sm">
            {errors.image?.message}
          </p>
        </div>
      </div>

      <button type="submit" className="mt-6 btn btn-primary w-full">
        {product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default EditorProduct;
