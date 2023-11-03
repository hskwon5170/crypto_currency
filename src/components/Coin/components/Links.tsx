import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { BottomLayout } from "../../commons/BottomLayout/BottomLayout";

interface LinksProps {
  links?: any;
}

export const Links = ({ links }: LinksProps) => {
  return (
    // <div>
    //   <strong className=" text-[#737373]">Links</strong>
    //   <div className="flex gap-6 pt-6">
    //     {keyOrder.map((el) => {
    //       const data = links[el];
    //       let link: string;
    //       let label;

    //       if (el === "twitter_screen_name" && typeof data === "string") {
    //         link = `https://twitter.com/${data}`;
    //         label = keyMapping[el];
    //       } else if (
    //         el === "homepage" &&
    //         Array.isArray(data) &&
    //         data.length > 0
    //       ) {
    //         link = data[0];
    //         label = keyMapping[el];
    //       } else if (el === "official_forum_url" && Array.isArray(data)) {
    //         link = data[0];
    //         label = data[0] !== "" ? keyMapping[el] : "";
    //       }

    //       return (
    //         <div
    //           className="text-[#fc72ff] flex items-center cursor-pointer"
    //           key={el}
    //           onClick={() => window.open(link)}
    //         >
    //           {label !== "" && (
    //             <div className="flex items-center gap-1 hover:text-opacity-50 hover:text-[#fc72ff] hover:transition-all hover:duration-300">
    //               {label} <FiArrowUpRight />
    //             </div>
    //           )}
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <BottomLayout subTitle="Links">
      <div className="flex gap-6 pt-6">
        {keyOrder.map((el) => {
          const data = links[el];
          let link: string;
          let label;

          if (el === "twitter_screen_name" && typeof data === "string") {
            link = `https://twitter.com/${data}`;
            label = keyMapping[el];
          } else if (
            el === "homepage" &&
            Array.isArray(data) &&
            data.length > 0
          ) {
            link = data[0];
            label = keyMapping[el];
          } else if (el === "official_forum_url" && Array.isArray(data)) {
            link = data[0];
            label = data[0] !== "" ? keyMapping[el] : "";
          }

          return (
            <div
              className="text-[#fc72ff] flex items-center cursor-pointer"
              key={el}
              onClick={() => window.open(link)}
            >
              {label !== "" && (
                <div className="flex items-center gap-1 hover:text-opacity-50 hover:text-[#fc72ff] hover:transition-all hover:duration-300">
                  {label} <FiArrowUpRight />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </BottomLayout>
  );
};

const keyOrder: Array<string> = [
  "twitter_screen_name",
  "homepage",
  "official_forum_url",
];

const keyMapping: { [key: string]: string } = {
  twitter_screen_name: "Twitter",
  homepage: "Website",
  official_forum_url: "Forum",
};
