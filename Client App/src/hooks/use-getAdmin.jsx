import { useEffect, useState } from "react";
import { request } from "../api/request";

const useGetAdmin = () => {
  const [admin, setAdmin] = useState();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch(request + "shop/admin");
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAdmin();
  });

  return admin;
};

export default useGetAdmin;
