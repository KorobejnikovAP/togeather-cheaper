import { setProducts } from "../reducers/products";
import serverProxy from "../../proxy/server-proxy";
import { ProductData } from "../interfaces";
import { AppDispatch } from "../store";

export const createProductAsync = (data: ProductData) => async () => {
    const product = await serverProxy.products.create(data);
    return product;
}

export const getProductsAsync = (userId: number) => async (dispatch: AppDispatch) => {
    const products = await serverProxy.products.get(userId);
    dispatch(setProducts({products}));
    return products;
}