"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@nextui-org/react";

const StatisticsCard = ({ color, icon, title, value, footer }) => {
  return (
    <div>
      <Card className="border w-full border-blue-gray-100 bg-grayLight shadow-sm rounded-md">
        <CardHeader
      
          className="absolute grid h-12 w-12 text-[20px] place-items-center bg-textColor text-white rounded-lg m-4"
        >
          {icon}
        </CardHeader>
        <CardBody className="p-4 text-right">
          <h1 className="font-normal text-[15px] text-gray-500">{title}</h1>
          <p className="text-textColor font-bold  text-[20px]">{value}</p>
        </CardBody>

        <CardFooter className="border-t border-blue-gray-50 text-[13.5px] p-4">
          {footer}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatisticsCard;
