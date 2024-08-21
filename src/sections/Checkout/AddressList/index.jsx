import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchAddressesData,
  deleteAddressData,
  setDefaultAddressData,
} from "../../../http/apiService";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "./style.scss";

function Index({
  setAddress,
  selectedAddress,
  setSelectedAddress,
  setEditAddressId,
}) {
  let auth_token = useSelector((state) => state.user.auth_token);
  let userId = useSelector((state) => state.user.userData.id);
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrentIndex, setIsCurrentIndex] = useState(0);
  const [addressData, setAddressData] = useState([]);

  const handleToggle = (index) => {
    setIsOpen(!isOpen);
    setIsCurrentIndex(index);
  };

  const fetchAddressesListData = async () => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const { data } = await fetchAddressesData(userId, header);
      setSelectedAddress(data?.[0]);
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
        fetchAddressesListData();
        setIsOpen(!isOpen);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  return (
    <div className="checkout_address_list">
      <div className="row">
        {addressData?.map((x, i) => (
          <div className="col-12 col-md-6 mt-2" key={i}>
            <div
              className={
                x?.id == selectedAddress?.id
                  ? "address_detail address_selected"
                  : "address_detail"
              }
              onClick={() => setSelectedAddress(x)}
            >
              <div className="address_header">
                <span
                  className={`address_badge ${x?.default == 1 ? "active" : ""}`}
                  onClick={() => handleDefaultAddress(x?.id)}
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
                      <li
                        onClick={() => {
                          setEditAddressId(x?.id);
                          setAddress(true);
                        }}
                      >
                        <BiEditAlt fontSize={"18px"} />
                        <span>Edit</span>
                      </li>
                      <li onClick={() => handleDeleteAddressData(x?.id)}>
                        <MdOutlineDelete fontSize={"18px"} />
                        <span>Delete</span>
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
            {/* <div className="address_detail">
              <input
                type="radio"
                id="address1"
                name="address"
                value="ard1"
                onChange={(e) => {
                  setSelectedAddress(e.target.value);
                }}
              />
              <label htmlFor="address1">
                <h5>{x?.full_name}</h5>
                <p>{x?.email}</p>
                <p>{x?.mobile}</p>
                <p className="mb-0">
                  {x?.address_line1} {x?.address_line2} {x?.city}, {x?.country},{" "}
                  {x?.state} {x?.postal_code}
                </p>
              </label>
            </div>
       */}
          </div>
        ))}

        <div className="col-12 mt-4 text-center">
          <button className="add_btn" onClick={() => setAddress(true)}>
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
