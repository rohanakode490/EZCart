import React, { useState } from 'react'
import './Shipping.css'
import { useDispatch, useSelector } from 'react-redux'
import { Country, State, City } from "country-state-city"
import { useAlert } from 'react-alert'
import {
    MdHome,
    MdLocationCity,
    MdPinDrop,
    MdLocalPhone,
    MdPublic,
    MdOutlineTransferWithinAStation
} from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { saveShippingInfo } from '../../actions/cartAction'

const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state)
    const [country, setCountry] = useState(shippingInfo.country)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits Long");
            return;
        }

        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        )

        navigate("/order/confirm");
    };

    return (
        <>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>
                    <form
                        className="shippingForm"
                        encType='multipart/form-data'
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <MdHome />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdLocationCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdPinDrop />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdLocalPhone />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        {/* Choose COUNTRY */}
                        <div>
                            <MdPublic />

                            {/* Options for the COUNTRY */}
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                {/* All country names */}
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* To first choose country then the options for states will be shown */}
                        {country && (
                            <div>
                                <MdOutlineTransferWithinAStation />

                                {/* Options for the STATE */}
                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        {/* CITY */}
                        {/* {state && (
                            <div>
                                <MdLocationCity /> */}

                        {/* Options for the City */}
                        {/* <select
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option value="">City</option>
                                    {City &&
                                        City.getCitiesOfState(country, state).map((item) => (
                                            <option key={item.name} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )} */}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>

            </div>
        </>
    )
}

export default Shipping