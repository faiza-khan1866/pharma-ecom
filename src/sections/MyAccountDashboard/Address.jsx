import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  fetchAddressesData,
  deleteAddressData,
  setDefaultAddressData,
} from "../../http/apiService";
import { useSelector } from "react-redux";

const Address = () => {
  const naviagte = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrentIndex, setIsCurrentIndex] = useState(0);

  const handleToggle = (index) => {
    setIsOpen(!isOpen);
    setIsCurrentIndex(index);
  };

  const [addressData, setAddressData] = useState([]);
  let auth_token = useSelector((state) => state.user.auth_token);
  let userId = useSelector((state) => state.user.userData.id);

  const fetchAddressesListData = async () => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const { data } = await fetchAddressesData(userId, header);
      setAddressData(data);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  useEffect(() => {
    fetchAddressesListData();
  }, []);

  const handleDeleteAddressData = async (id) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await deleteAddressData(id, header);
      if (response.status === 200 || response.status === 201) {
        toast.success("Address has been Deleted Successfully!");
        fetchAddressesListData();
        setIsOpen(!isOpen);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const handleDefaultAddress = async (id) => {
    try {
      let formdata = {
        user_id: userId,
      };
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await setDefaultAddressData(id, formdata, header);
      if (response.status === 200 || response.status === 201) {
        toast.success("Address has been Set to Default Successfully!");
        fetchAddressesListData();
        setIsOpen(!isOpen);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  return (
    <div className="addresses_wrape">
      <h4 className="title">Manage Address</h4>
      <p>
        The following addresses will be used on the checkout page by default.
      </p>
      <Button
        className="add_btn"
        onClick={() => naviagte("/account/add-address")}
      >
        + Add New Address
      </Button>
      {addressData?.map((x, i) => (
        <div className="address_detail" key={i}>
          <div className="address_header">
            <span
              className={`address_badge ${x?.default == 1 ? "active" : ""}`}
            >
              {x?.address_type}
            </span>
            <div className="dots_wrape">
              <BiDotsVerticalRounded
                fontSize={"26px"}
                className={`dotsStyle ${
                  isOpen && isCurrentIndex == i ? "active" : ""
                }`}
                onClick={() => handleToggle(i)}
              />
              {isOpen && isCurrentIndex == i && (
                <ul
                  className={`menu-items ${
                    isOpen && isCurrentIndex == i ? "active" : ""
                  }`}
                >
                  <li onClick={() => naviagte(`/account/add-address/${x?.id}`)}>
                    <BiEditAlt fontSize={"18px"} />
                    <span>Edit</span>
                  </li>
                  <li onClick={() => handleDeleteAddressData(x?.id)}>
                    <MdOutlineDelete fontSize={"18px"} />
                    <span>Delete</span>
                  </li>
                  <li onClick={() => handleDefaultAddress(x?.id)}>
                    <FaRegAddressCard fontSize={"18px"} />
                    <span>Set Default</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div>
            <h5>{x?.full_name}</h5>
            <p>{x?.email}</p>
            <p>{x?.mobile}</p>
            <p className="mb-0">
              {x?.address_line1} {x?.address_line2} {x?.city}, {x?.country},{" "}
              {x?.state} {x?.postal_code}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Address;
