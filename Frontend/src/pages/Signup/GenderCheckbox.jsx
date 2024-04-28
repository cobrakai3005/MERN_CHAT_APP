import React from "react";

export default function GenderCheckbox({ register }) {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer ">
          <span className="label-text">Male</span>
          <input
            type="radio"
            className="radio  border-slate-900"
            // checked={selectedGender === "male"}
            {...register("gender", { required: true })}
            value="male"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="radio"
            className="radio border-slate-900"
            // checked={selectedGender === "female"}
            {...register("gender", { required: true })}
            value="female"
          />
        </label>
      </div>
    </div>
  );
}
