import React, { FC } from "react";
import { MdOutlineShowChart } from "react-icons/md";
import { MdCandlestickChart } from "react-icons/md";
import { Button } from "@chakra-ui/react";

interface ChartIconProps {
  isArea?: boolean;
  unableCandle?: boolean;
}

export const ChartIcon: FC<ChartIconProps> = ({ isArea = true, unableCandle }) => {
  return (
    <Button colorScheme="teal" size="md" isDisabled={unableCandle}>
      <div className="transition-all duration-300 ease-in-out">{isArea ? <MdCandlestickChart /> : <MdOutlineShowChart />}</div>
    </Button>
  );
};
