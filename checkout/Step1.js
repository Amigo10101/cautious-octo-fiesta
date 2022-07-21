import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import "./step1.module.css";
import Slider from "./slider";

const Step1 = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { actions, state } = useStateMachine({ updateAction });
  const Navigate = useNavigate();
  const onSubmit = (data) => {
    actions.updateAction(data);
    actions.updateAction(posts[data.Packagename]);
    console.log();

    Navigate("/step2");
  };
  const posts = [
    { id: 0, title: "Package11", price: "$1" },
    { id: 1, title: "Package22", price: "$2" },
    { id: 2, title: "Package33", price: "$3" },
    { id: 3, title: "Package44", price: "$4" },
  ];
  const content = posts.map((post) => (
    <div className="col p-2 m-0" key={post.id}>
      <input
        hidden
        {...register("Packagename", { required: true })}
        type="radio"
        value={post.id}
        id={post.id}
      />
      <label className="Package shadow-lg " htmlFor={post.id}>
        <div
          className="w-100 px-5 py-2 text-white fw-bold"
          style={{
            backgroundColor: "#82cf95",
            borderRadius: "20px 20px 0px 0px",
            letterSpacing: "2px",
          }}
        >
          MONTHLY PLAN
        </div>
        {post.title}

        <div style={{ fontSize: "60px" }}>
          <div className="fs-6"> From</div>
          {post.price}
          <sup className="fs-1">.99</sup>
          <span className="fs-6">/MO </span>
        </div>
      </label>
    </div>
  ));
  return (
    <div style={{ background: "" }} className=" mt-5 m-auto">
      <form style={{boxShadow:'0 1rem 3rem #82cf95',borderRadius:'29px'}} onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            backgroundColor: "#82cf95",
            borderRadius: "29px 29px 0px 0px",
            letterSpacing: "2px",
          }}
          className=" text-center text-white p-3"
        >
          <span className="fw-bold fs-4 float-start"> 1</span>
          <span className="text-center fw-bold fs-4">Choose a package</span>
        </div>
        <div>
          <div className="bg-light p-5">
            <div className="container">
              <Slider />
            </div>
            <div className="row">{content}</div>

            <div className="text-danger fw-bold">
              {errors.Packagename?.type === "required" &&
                "⚠ Please Choose A Package"}
            </div>
            <div className="container w-75 pt-5">
              <input type="submit" value="Next" />
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#82cf95",
            letterSpacing: "2px",
            borderRadius:"0px 0px 29px 29px"
          }}
          className=" stepsbg text-center"
        >
          <div className="fs-4  p-3 ">
            <strong className="float-start">2</strong>Customer Information
            <div className="border border-bottom rounded mt-4 w-50 m-auto" ></div>
          </div>
          <div
            style={{
              backgroundColor: "#82cf95",
              letterSpacing: "2px",
              borderRadius:'0px 0px 29px 29px'
            }}
            className="stepsbg fs-4  p-3"
          >
            <strong className="float-start">3</strong>
            Review Information
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step1;
