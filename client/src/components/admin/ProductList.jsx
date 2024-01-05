import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { clearErrors, getAdminProduct, deleteProduct } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from '@mui/material/Button';
import MetaData from "../layout/MetaData";
import { MdModeEdit, MdDelete } from "react-icons/md";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";


const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const alert = useAlert();

  // all products
  const { error, products } = useSelector((state) => state.products);

  // from product - delete and Update one
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  // grid columns
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.id}`}>
              <MdModeEdit />
            </Link>

            {/* delete button */}
            <Button
              onClick={() =>
                deleteProductHandler(params.id)
              }
            >
              <MdDelete />
            </Button>
          </>
        );
      },
    },
  ];


  // grid rows 
  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;