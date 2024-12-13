import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { showErrorAtom } from "../../../../../packages/ui/Error/error-store";
import { useConfigAPI } from "../../../../../packages/api/config-api";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileFromLS } from "../../../../../utils/localStorageHandler";
import { UserProfileResponse } from "../../../../../packages/types/api.types";
import CourseRoom from "../CourseRoom";
import { ws } from "../../../../../socketIO";

export default function RoomWait() {
  const [checkPayment, setCheckPayment] = useState();
  const setShowError = useSetAtom(showErrorAtom);
  const apiCall = useConfigAPI();
  const { idCourse } = useParams();
  const accessToken = localStorage.getItem("access_token");
  const [approved, setApproved] = useState(false);
  const [profileUser, setProfileUser] = useState<UserProfileResponse>();
  const nav = useNavigate();
  useEffect(() => {
    const fetchDataCheckCourse = async () => {
      const response = await apiCall.Course_CheckPurchasedCourse(idCourse);
      if (response.isSuccess) {
        setCheckPayment(response.data.FlagPayment);
      } else {
        setShowError({
          isSuccess: false,
          message: response.message,
          data: {
            message: response.message,
          },
        });
      }
    };
    const fetchDataUser = async () => {
      const response: any = await apiCall.Get_Profile_User();
      if (response.isSuccess) {
        setProfileUser(response.data);
      } else {
        setShowError({
          isSuccess: false,
          message: response.message,
          data: {
            message: response.message,
          },
        });
      }
    };

    if (accessToken) {
      fetchDataCheckCourse();
      fetchDataUser();
    }
  }, [idCourse]);

  return (
    <>
      {checkPayment === "0" ? (
        <>
          <div className="flex justify-center items-center h-[100vh]">
            {accessToken === null ? (
              <>
                <span
                  className="ml-1 cursor-pointer hover:underline hover:text-red-600"
                  onClick={() => nav(`/login`)}>
                  Vui lòng đăng nhập
                </span>
              </>
            ) : (
              <>
                Khóa học chưa được kích hoạt. Vui lòng kích hoạt{" "}
                <span
                  className="ml-1 cursor-pointer hover:underline hover:text-red-600"
                  onClick={() => nav(`/course/detail/${idCourse}`)}>
                  {" "}
                  Tại đây
                </span>
              </>
            )}
          </div>
        </>
      ) : (
        <CourseRoom />
      )}
    </>
  );
}
