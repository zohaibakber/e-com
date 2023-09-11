"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ApiAlert";
import { useOrigin } from "@/hooks/use-origin";
import { UploadButton } from "@/lib/uploadthing";
import { getAuthSession } from "@/lib/auth";

interface BillBoardFormProps {
  initialData: Billboard | null;
  userId: string;
}

const formSchema = z.object({
  name: z.string().nonempty({ message: "Store name is required" }),
});

type BillBoardFormValues = z.infer<typeof formSchema>;

const BillBoardForm: FC<BillBoardFormProps> = ({ initialData, userId }) => {
  const form = useForm<BillBoardFormValues>({
    resolver: zodResolver(formSchema),
  });

  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: BillBoardFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast({ title: "Success", description: "Store updated successfully" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast({
        title: "Success",
        description: "Store deleted successfully",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  const origin = useOrigin();

  return (
    <>
      <AlertModal
        isOpen={open}
        isLoading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title="BillBoards" description="Manage billboards here" />
        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            disabled={loading}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <UploadButton
        className="border-2 border-gray-300 rounded-md p-2"
        endpoint="imageUploader"
        key={userId}
        onClientUploadComplete={() => {
          toast({
            title: "Success",
            description: "Image uploaded successfully",
          });
          axios.patch(`/api/billboards/${params.billboardId}`);
        }}
        onUploadError={(error) => {
          toast({
            title: "Error",
            description: "Something went wrong uploading the image",
            variant: "destructive",
          });
          console.error(error);
        }}
      />
    </>
  );
};

export default BillBoardForm;
