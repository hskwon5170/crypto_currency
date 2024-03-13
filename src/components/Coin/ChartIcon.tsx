import React, { FC } from "react";
import { MdOutlineShowChart } from "react-icons/md";
import { MdCandlestickChart } from "react-icons/md";
import { Button } from "@chakra-ui/react";

interface ChartIconProps {
  isArea?: boolean;
  unableCandle?: boolean;
}

export const ChartIcon: FC<ChartIconProps> = ({ isArea = true, unableCandle }) => {
  // if (!unableCandle)
  //   return (
  //     // <Button colorScheme="teal" size="md" isDisabled={unableCandle}>
  //     //   <div className="transition-all duration-300 ease-in-out">{isArea ? <MdCandlestickChart /> : <MdOutlineShowChart />}</div>
  //     // </Button>
  //     <Button colorScheme="teal" size="md">
  //       <div className="transition-all duration-300 ease-in-out">{isArea ? <MdCandlestickChart /> : <MdOutlineShowChart />}</div>
  //     </Button>
  //   );

  // if (unableCandle)
  //   return (
  //     <Button colorScheme="teal" size="md">
  //       <div className="transition-all duration-300 ease-in-out">{<MdOutlineShowChart />}</div>
  //     </Button>
  //   );
  return (
    <div>
      {!unableCandle ? (
        <Button colorScheme="teal" size="md">
          <div className="transition-all duration-300 ease-in-out">{isArea ? <MdCandlestickChart /> : <MdOutlineShowChart />}</div>
        </Button>
      ) : (
        <Button colorScheme="teal" size="md" className="cursor-none">
          <div className="transition-all duration-300 ease-in-out">{<MdOutlineShowChart />}</div>
        </Button>
      )}
    </div>
  );
};
