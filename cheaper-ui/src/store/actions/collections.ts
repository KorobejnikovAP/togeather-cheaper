import { setCollections } from "../reducers/collections";
import { serverProxy } from "../../proxy/server-proxy";
import { AppDispatch } from "../store";

export const getCollectionsAsync = () => async (dispatch: AppDispatch) => {
    const collections = await serverProxy.collections.get();
    dispatch(setCollections({collections}));
    return collections;
}