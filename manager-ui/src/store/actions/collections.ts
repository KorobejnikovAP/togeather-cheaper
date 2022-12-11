import { setCollections } from "../reducers/collections";
import serverProxy from "../../proxy/server-proxy";
import { CollectionData, ProductData } from "../interfaces";
import { AppDispatch } from "../store";

export const createCollectionAsync = (data: CollectionData) => async () => {
    const collection = await serverProxy.collections.create(data);
    return collection;
}

export const getCollectionsAsync = () => async (dispatch: AppDispatch) => {
    const collections = await serverProxy.collections.get();
    dispatch(setCollections({collections}));
    return collections;
}

export const closeCollecitonAsync = (collectionId: number) => async (dispatch: AppDispatch) => {
    const users = await serverProxy.collections.close(collectionId);
    return users;
}