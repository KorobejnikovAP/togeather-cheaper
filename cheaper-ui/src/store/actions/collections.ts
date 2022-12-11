import { setCollections } from "../reducers/collections";
import { serverProxy } from "../../proxy/server-proxy";
import { AppDispatch } from "../store";
import { AppState, Collection } from "../interfaces";

export const getCollectionsAsync = () => async (dispatch: AppDispatch) => {
    const collections = await serverProxy.collections.get();
    dispatch(setCollections({collections}));
    return collections;
}

export const joinCollectionAsync = (collectionId: number) => async (dispatch: AppDispatch, getState: ()=>AppState) => {
    const response = await serverProxy.collections.join(collectionId);
    const collections = getState().collections.collections;
    const idx = collections.findIndex((collect) => collect.id === collectionId);
    const copy = [...collections]
    copy[idx] = {
        ...collections[idx],
        is_active: true,
        count_current_buyers: collections[idx].count_current_buyers + 1,
    };
    dispatch(setCollections({collections: copy}));
    return response;
}

export const getActiveCollectionsAsync = () => async (dispatch: AppDispatch, getState: ()=>AppState) => {
    const userId = getState().auth.user?.id;
    const currentCollections = getState().collections.collections;
    const activeCollections: Collection[] = await serverProxy.collections.getActive(userId as number);
    activeCollections.forEach((activeCollection) => {
        const idx = currentCollections.findIndex((c) => c.id === activeCollection.id);
        currentCollections[idx].is_active = true;
    });
    dispatch(setCollections({collections: currentCollections}));
    return activeCollections;
}