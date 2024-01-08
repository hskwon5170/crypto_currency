import React, { FC } from "react";
import { MdOutlineShowChart } from "react-icons/md";
import { MdCandlestickChart } from "react-icons/md";
import { Button } from "@chakra-ui/react";

interface ChartIconProps {
  isArea?: boolean;
}

export const ChartIcon: FC<ChartIconProps> = ({ isArea = true }) => {
  return (
    <Button colorScheme="teal" size={"md"}>
      <div className="transition-all ease-in-out duration-300">
        {isArea ? <MdCandlestickChart /> : <MdOutlineShowChart />}
      </div>
    </Button>
  );
};
