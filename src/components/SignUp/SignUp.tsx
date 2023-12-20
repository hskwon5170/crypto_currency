import React from "react";

export const SignUp = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen justify-center gap-3">
      <h1>회원가입</h1>
      <form className="flex flex-col  w-[40vw]">
        <input
          type="email"
          placeholder="email"
          className="border p-2 border-gray-300 bg-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-2 border-gray-300 bg-gray-300 rounded-md my-3"
        />
        <button
          type="submit"
          className="border-2 bg-[#4ffae5] text-black font-semibold p-2 rounded-md"
        >
          회원가입하기
        </button>
      </form>
    </div>
  );
};
