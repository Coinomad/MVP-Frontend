import React, { useEffect, useState } from "react";
import {
  IoCheckmarkOutline,
  IoCopyOutline,
  IoSwapVerticalOutline,
} from "react-icons/io5";
import axiosInstance from "@/Data/axiosInstance";
import secureLocalStorage from "react-secure-storage";
import bitcoin from "/public/svg/Bitcoin Badge.svg";
import polygon from "/public/svg/Coinnomad logo.svg";
import ethereum from "/public/svg/Eth (1).svg";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import UpdateDeleteEmployeeModal from "./Modals/UpdateDeleteEmployeeModal";
import { truncateWalletAddress } from "@/Data/formikUtils";
import SchedulePayments from "./Modals/SchedulePayments/SchedulePayments";

const EmployeeTable = ({
  existData,
  setExistData,
  loadEmployees,
  setLoadEmployees,
  data,
}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [updateEmployees, setUpdateEmployees] = useState(false);
  const [schedulePayments, setSchedulePayments] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const user = secureLocalStorage.getItem("user");

  const config = {
    headers: {
      Authorization: `Bearer ${user.ccessToken}`,
    },
  };
  console.log("data", data);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setUpdateEmployees(true);
  };

  const copyToClipboard = (address) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Address copied");
      })
      .catch((err) => {
        toast.error("Failed to copy");
      });
  };

  const handleCopy = (index, emp) => {
    setCopiedIndex(index);
    copyToClipboard(emp.walletAddress);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 4000);
  };

  const [employeeId, setEmployeeId] = useState("")
  const [userAsset, setUserAsset] = useState("")

  return (
    <>
      {data.length > 0 ? (
        <div className="table-container whitespace-nowrap overflow-auto w-full">
          <table className="w-full border-collapse">
            {/* Table header */}
            <thead>
              <tr className="border-b border-[#E9E9E9]">
                <th
                  className="px-8 py-4 text-[#9C9C9C] text-[.875rem] font-semibold leading-[1rem] text-start"
                  scope="col"
                >
                  First Name
                </th>
                <th
                  className="px-8 py-4 text-[#9C9C9C] text-[.875rem] font-semibold leading-[1rem] text-start"
                  scope="col"
                >
                  Last Name
                </th>
                <th
                  className="px-8 py-4 text-[#9C9C9C] text-[.875rem] font-semibold leading-[1rem] text-start"
                  scope="col"
                >
                  Email
                </th>
                <th
                  className="px-8 py-4 text-[#9C9C9C] text-[.875rem] font-semibold leading-[1rem] text-start"
                  scope="col"
                >
                  Wallet address
                </th>
                <th
                  className="px-8 py-4 text-[#9C9C9C] text-[.875rem] font-semibold leading-[1rem] text-start"
                  scope="col"
                >
                  Asset
                </th>
                <th
                  className="px-8 py-4 text-[#9C9C9C] text-[.875rem] font-semibold leading-[1rem] text-start"
                  scope="col"
                >
                  Payment status
                </th>
                <th
                  className="px-8 py-4 text-[#9C9C9C] text-[.875rem] font-semibold leading-[1rem] text-start"
                  scope="col"
                >
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {data.map((emp, index) => {
                console.log("empersds", emp.scheduleTransaction);
                return (
                  <tr
                    key={index}
                    className="border-b  hover:bg-[#F7F7F7] border-[#E9E9E9]"
                  >
                    <td className="py-[12px] px-[32px] text-[.875rem] text-[#151515] font-semibold">
                      {emp.firstName}
                    </td>
                    <td className="py-[12px] px-[24px] text-[.875rem] text-[#151515] font-semibold">
                      {emp.lastName}
                    </td>
                    <td className="py-[12px] px-[24px] text-[.875rem] text-[#151515] font-semibold">
                      {emp.email}
                    </td>
                    <td className="py-[12px] px-[24px]">
                      <div className="flex justify-center items-start">
                        {copiedIndex === index ? (
                          <IoCheckmarkOutline className="text-green-400 font-bold text-[1.125rem]" />
                        ) : (
                          <IoCopyOutline
                            onClick={() => handleCopy(index, emp)}
                            className="text-[#1F2937] font-bold text-[1.125rem]"
                          />
                        )}
                        <p className="text-[#151515] text-[.875rem] font-semibold pl-2">
                          {truncateWalletAddress(emp.walletAddress)}
                        </p>
                      </div>
                    </td>
                    <td className="py-[12px] px-[24px]">
                      {emp?.asset === "BTC" ? (
                        <div className="flex justify-center items-start">
                          <img
                            className="w-6 h-6"
                            src={bitcoin}
                            alt="Bitcoin"
                          />
                          <span className="text-[#9C9C9C] text-[.875rem] font-semibold pl-2">
                            Bitcoin
                          </span>
                        </div>
                      ) : emp?.asset === "ETH" ? (
                        <div className="flex justify-center items-start">
                          <img
                            className="w-6 h-6"
                            src={ethereum}
                            alt="Ethereum"
                          />
                          <span className="text-[#9C9C9C] text-[.875rem] font-semibold pl-2">
                            Ethereum
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-center items-start">
                          <img
                            className="w-6 h-6"
                            src={polygon}
                            alt="Polygon"
                          />
                          <span className="text-[#9C9C9C] text-[.875rem] font-semibold pl-2">
                            Polygon
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-[12px] px-[32px] text-[.875rem] text-[#151515] font-semibold">
                      {emp.scheduleTransaction ? (
                        <p className="bg-[#E9F7EF] rounded-[5px] py-1 px-3 items-center gap-1 text-[#23AE5E] text-[.875rem] font-semibold leading-4 text-center">
                          Scheduled
                        </p>
                      ) : (
                        <p className="bg-[#FFF2F0] rounded-[5px] py-1 px-3 items-center gap-1 text-[#ED2F2F] text-[.875rem] font-semibold leading-4 text-center">
                          Unscheduled
                        </p>
                      )}
                    </td>
                    <td className="py-[12px] gap-[16px] flex px-[32px]">
                      <button
                        className="py-1 px-3 rounded-[5px] border border-[#2F4EED] text-[#2F4EED] text-[.75rem] font-medium cursor-pointer"
                        onClick={() => handleEditClick(emp)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSchedulePayments(true);
                          setEmployeeId(emp.employeeId);
                          setUserAsset(emp.asset)
                        }}
                        className="py-1 px-3 rounded-[5px] bg-[#2F4EED] text-white text-[.75rem] font-medium cursor-pointer"
                      >
                        Schedule Payments
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center px-[10px] py-[80px] md:h-[612px] w-full gap-[10px]">
          <div className="rounded-full p-[10px] bg-[#F7F7F7] gap-[10px] flex justify-center items-center">
            <IoSwapVerticalOutline className="text-[1.25rem] rotate-[45deg]" />
          </div>
          <p className="text-[#000000] text-[1.125rem] font-semibold leading-7">
            No Activity
          </p>
        </div>
      )}
      {updateEmployees && selectedEmployee && (
        <UpdateDeleteEmployeeModal
          updateEmployees={updateEmployees}
          setUpdateEmployees={setUpdateEmployees}
          employeeDetails={selectedEmployee}
          setExistData={setExistData}
          setLoadEmployees={setLoadEmployees}
        />
      )}

      {schedulePayments && (
        <SchedulePayments
          setSchedulePayments={setSchedulePayments}
          schedulePayments={schedulePayments}
          employeeId={employeeId}
          setExistData={setExistData}
          userAsset={userAsset}
        />
      )}
    </>
  );
};

export default EmployeeTable;
