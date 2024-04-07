import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import stoken from "../../public/images/stoken.png";
import Image from "next/image";
import TokenYearDropdown from "./TokenYearDropdown";
import { useDispatch, useSelector } from "react-redux";
import { totalToken } from "../../redux/slices/coinSlice";

const customStyles = {
  headCells: {
    style: {
      justifyContent: "center",
      backgroundColor: "#eee8fe",
      color: "#ffcc02",
      fontSize: "16px",
      fontWeight: "800",
      border: "1px solid #B9B9B9",
      borderBottomStyle: "none",
    },
  },
  cells: {
    style: {
      border: "0.1px solid #B9B9B9",
      borderBottomStyle: "none",
      borderleftStyle: "none",
      borderrightStyle: "none",
      color: "#1f1f1f",
      fontWeight: "600",
      justifyContent: "center",
      backgroundColor: "white",
    },
  },
  rows: {
    style: {
      margin: 0,
      padding: 0,
      borderBottomStyle: "none",
      borderleftStyle: "none",
      borderrightStyle: "none",
      justifyContent: "center",
    },
  },
  table: {
    style: {
      borderCollapse: "collapse",
      borderRadius: "20px",
    },
  },
  pagination: {
    style: {
      justifyContent: "center",
    },
  },
};

const TokenUsage = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [tableData, setTableData] = useState();
  const userData = useSelector((state) => state?.userData?.data);
  const tokenUsage = useSelector((state) => state?.coin?.tokenUsage);
  const recentUsed = tokenUsage?.previousMonthTotalUsage
    ? tokenUsage?.previousMonthTotalUsage?.toLocaleString()
    : tokenUsage?.selectedMonthTotalUsage?.toLocaleString();
  const totalTokenTillNow = useSelector(
    (state) => state?.userData?.totalUsageTillDate
  );

  const sumTokensUsed = (data) => {
    return data?.reduce((sum, obj) => sum + obj.tokensUsed, 0);
  };

  const totalTokensUsed = sumTokensUsed(userData?.tokenUsage);

  const dispatch = useDispatch();

  useEffect(() => {
    setTableData(tokenUsage?.tokenUsageReport);
  }, [tokenUsage]);

  const getMonthNumber = (month) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const lowercaseMonth = month?.toLowerCase();
    const monthNumber =
      monthNames.findIndex((name) => name.toLowerCase() === lowercaseMonth) + 1;

    return monthNumber;
  };

  const handleSelect = async (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);

    const monthNumber = getMonthNumber(month);

    const payload = {
      month: monthNumber,
      year: year,
    };
    dispatch(totalToken(payload));
    // setTableData(tokenUsage);
  };

  const columns = [
    {
      name: "Date",
      cell: (row, index) => {
        const dateObject = new Date(row.date);
        const formattedDate = dateObject.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return formattedDate;
      },
      selector: "date",
      width: "15%",
    },

    {
      name: "No. of Tokens Used",
      cell: (row, index) => row.tokensUsed.toLocaleString(),
      selector: "tokensUsed",
      sortable: false,
      width: "25%",
    },
    {
      name: "No. of Tokens Remaining",
      cell: (row, index) => row.tokensRemaining.toLocaleString(),
      selector: "tokensRemaining",
      sortable: false,
      width: "25%",
    },
    {
      name: "Uploaded Material",
      cell: (row, index) => row.uploadedMaterial,
      selector: "uploadedMaterial",
      sortable: false,
    },
  ];

  const currentDate = new Date();
  const lastMonth = (currentDate.getMonth() || 12) - 1;
  const lastYear =
    lastMonth === 12
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const lastMonthName = monthNames[lastMonth];

  return (
    <div className="flex flex-col text-black">
      <div className="flex flex-row">
        <div className="w-[30%]">
          <div className="w-full">
            <div className="flex flex-row justify-between items-center mb-2 mt-2">
              <p className="font-medium w-[80%]">My Tokens : </p>
              <div className="flex flex-row items-center w-[30%]">
                <Image src={stoken} height={30} width={30} alt="icon" />
                <p className="text-[16px] font-bold">
                  {" "}
                  {userData?.tokenBalance?.toLocaleString()}{" "}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-2 mt-2">
              <p className="font-medium w-[80%]">
                Tokens Used in{" "}
                {selectedMonth
                  ? `${selectedMonth} ${selectedYear}`
                  : lastMonthName + " " + lastYear}{" "}
                :
              </p>
              <div className="flex flex-row items-center w-[30%]">
                <Image src={stoken} height={30} width={30} alt="icon" />
                <p className="text-[16px] font-bold">
                  {recentUsed ? recentUsed : 0}{" "}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-2 mt-2">
              <p className="font-medium w-[80%]"> Tokens Used till now : </p>
              <div className="flex flex-row items-center w-[30%]">
                <Image src={stoken} height={30} width={30} alt="icon" />
                <p className="text-[16px] font-bold">
                  {totalTokensUsed?.toLocaleString()}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[70%] relative ">
          {/* Your content */}
          <div className="absolute  right-[20px] flex flex-row">
            <TokenYearDropdown onSelect={handleSelect} />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={tableData?.length > 0 ? tableData : []}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        customStyles={customStyles}
      />
    </div>
  );
};

export default TokenUsage;
