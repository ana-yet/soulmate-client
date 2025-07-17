import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  HiOutlineIdentification,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineMail,
} from "react-icons/hi";
import useAuth from "../../../Hook/useAuth";
import useImgbbUploader from "../../../Hook/useImgbbUploader";
import { biodataOptions } from "../../../Config/biodataOptions";
import FormInput from "./FormInput";
import { useBiodata } from "../../../Hook/useBiodata";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const FormSelect = ({
  label,
  name,
  register,
  validation = {},
  errors,
  children,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-txt/80 mb-1"
    >
      {label}
    </label>
    <select
      id={name}
      {...register(name, validation)}
      className="w-full rounded-lg border border-secondary/50 bg-background py-2.5 px-4 font-primary text-txt transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
    >
      {children}
    </select>
    {errors[name] && (
      <p className="mt-1 text-xs text-accent">{errors[name].message}</p>
    )}
  </div>
);

const EditBiodata = () => {
  const { user } = useAuth();
  const secureAxios = useAxiosSecure();
  const { uploadImage, uploading } = useImgbbUploader();
  const { data: existingBiodata, isLoading, refetch } = useBiodata(user?.email);
  const isEditMode = !!existingBiodata;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({ defaultValues: { contactEmail: user?.email || "" } });

  const dateOfBirth = watch("dateOfBirth");
  const age = useMemo(() => {
    if (!dateOfBirth) return "";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
      calculatedAge--;
    return calculatedAge;
  }, [dateOfBirth]);

  useEffect(() => {
    if (isEditMode && existingBiodata) {
      const formattedData = {
        ...existingBiodata,
        dateOfBirth: existingBiodata.dateOfBirth
          ? new Date(existingBiodata.dateOfBirth).toISOString().split("T")[0]
          : "",
      };
      reset(formattedData);
    }
  }, [existingBiodata, isEditMode, reset]);

  const onSubmit = async (formData) => {
    const toastId = toast.loading(
      isEditMode ? "Updating biodata..." : "Publishing biodata..."
    );

    try {
      let imageUrl = existingBiodata?.profileImage || "";
      if (!formData.profileImage && formData.profileImage[0]) {
        imageUrl = await uploadImage(formData.profileImage[0]);
      } else {
        imageUrl = existingBiodata?.profileImage;
      }

      const biodataPayload = {
        ...formData,
        age,
        isPremium: false,
        profileImage: imageUrl,
        contactEmail: user.email,
      };

      const response = isEditMode
        ? await secureAxios.patch(
            `/biodata/${existingBiodata._id}`,
            biodataPayload
          )
        : await secureAxios.post("/biodata", biodataPayload);

      if (response.data) {
        toast.success(
          `Biodata ${isEditMode ? "updated" : "published"} successfully!`,
          { id: toastId }
        );
        refetch();
      }
    } catch (error) {
      console.error("Failed to save biodata:", error);
      toast.error(error.message || "An error occurred.", { id: toastId });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading your biodata...</p>
      </div>
    );

  return (
    <div className="w-full mx-auto p-6 bg-background/50 border border-gray-200 rounded-2xl shadow-lg">
      <h1 className="font-secondary text-3xl font-bold text-txt mb-2">
        {isEditMode ? "Edit Your Biodata" : "Create Your Biodata"}
      </h1>
      <p className="text-txt/70 mb-8">
        {isEditMode
          ? "Update your information to keep your profile fresh."
          : "Fill in the details below to find your perfect match."}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* --- Personal Information --- */}
          <FormSelect
            label="Biodata Type"
            name="biodataType"
            register={register}
            validation={{ required: "This field is required" }}
            errors={errors}
          >
            <option value="">Select Type...</option>
            {biodataOptions.biodataTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FormSelect>

          <FormInput
            label="Name"
            name="name"
            register={register}
            validation={{ required: "Name is required" }}
            errors={errors}
            icon={<HiOutlineUser />}
            placeholder="Your full name"
          />

          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            register={register}
            validation={{ required: "Date of birth is required" }}
            errors={errors}
            icon={<HiOutlineCalendar />}
          />

          <FormSelect
            label="Height"
            name="height"
            register={register}
            validation={{ required: "Height is required" }}
            errors={errors}
          >
            <option value="">Select Height...</option>
            {biodataOptions.heights.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </FormSelect>

          <FormSelect
            label="Weight"
            name="weight"
            register={register}
            validation={{ required: "Weight is required" }}
            errors={errors}
          >
            <option value="">Select Weight...</option>
            {biodataOptions.weights.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </FormSelect>

          <FormInput
            label="Age"
            name="age"
            type="number"
            value={age}
            register={register}
            errors={errors}
            readOnly
            disabled
            icon={<HiOutlineUser />}
            placeholder="Auto-calculated"
          />

          <FormSelect
            label="Occupation"
            name="occupation"
            register={register}
            validation={{ required: "Occupation is required" }}
            errors={errors}
          >
            <option value="">Select Occupation...</option>
            {biodataOptions.occupations.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </FormSelect>

          <FormSelect
            label="Race"
            name="race"
            register={register}
            validation={{ required: "Race is required" }}
            errors={errors}
          >
            <option value="">Select Race...</option>
            {biodataOptions.races.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </FormSelect>

          <FormInput
            label="Father's Name"
            name="fathersName"
            register={register}
            validation={{ required: "Father's name is required" }}
            errors={errors}
            icon={<HiOutlineUser />}
          />
          <FormInput
            label="Mother's Name"
            name="mothersName"
            register={register}
            validation={{ required: "Mother's name is required" }}
            errors={errors}
            icon={<HiOutlineUser />}
          />

          <FormSelect
            label="Permanent Division"
            name="permanentDivision"
            register={register}
            validation={{ required: "Permanent division is required" }}
            errors={errors}
          >
            <option value="">Select Division...</option>
            {biodataOptions.divisions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </FormSelect>

          <FormSelect
            label="Present Division"
            name="presentDivision"
            register={register}
            validation={{ required: "Present division is required" }}
            errors={errors}
          >
            <option value="">Select Division...</option>
            {biodataOptions.divisions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </FormSelect>

          {/* --- Partner Expectation --- */}
          <FormInput
            label="Expected Partner Age"
            name="expectedPartnerAge"
            type="number"
            register={register}
            validation={{ required: "This field is required" }}
            errors={errors}
            icon={<HiOutlineUser />}
          />

          <FormSelect
            label="Expected Partner Height"
            name="expectedPartnerHeight"
            register={register}
            validation={{ required: "This field is required" }}
            errors={errors}
          >
            <option value="">Select Height...</option>
            {biodataOptions.heights.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </FormSelect>

          <FormSelect
            label="Expected Partner Weight"
            name="expectedPartnerWeight"
            register={register}
            validation={{ required: "This field is required" }}
            errors={errors}
          >
            <option value="">Select Weight...</option>
            {biodataOptions.weights.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </FormSelect>

          {/* --- Contact & Image --- */}
          <FormInput
            label="Contact Email"
            name="contactEmail"
            register={register}
            errors={errors}
            readOnly
            disabled
            icon={<HiOutlineMail />}
          />

          <FormInput
            label="Mobile Number"
            name="mobileNumber"
            register={register}
            validation={{ required: "Mobile number is required" }}
            errors={errors}
            icon={<HiOutlineIdentification />}
            placeholder="+8801..."
          />

          <div>
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-txt/80 mb-1"
            >
              Profile Image
            </label>
            <input
              id="profileImage"
              type="file"
              {...register("profileImage", { required: !isEditMode })}
              className="block w-full text-sm text-txt file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
            />
            {errors.profileImage && (
              <p className="mt-1 text-xs text-accent">
                {errors.profileImage.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-secondary/20 text-right">
          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="inline-flex justify-center rounded-lg bg-accent py-3 px-8 font-primary text-lg font-semibold text-white shadow-md transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-accent/50"
          >
            {isSubmitting || uploading
              ? "Processing..."
              : "Save and Publish Biodata"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;
