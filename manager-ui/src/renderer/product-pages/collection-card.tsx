/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { Collection, Product, User } from '../../store/interfaces';
import { closeCollecitonAsync } from '../../store/actions/collections';

interface Props {
    collection: Collection
}

export default function CollectionCard (props: Props) {
const { collection } = props;
const { id, count_for_buy, count_current_buyers } = collection;
const navigate = useNavigate();
const dispatch: AppDispatch = useDispatch();
const [isModalOpen, setIsModalOpen] = useState(false);
const [usersList, setUsersList] = useState<User[]>([]);
const [disabled, setDisabled] = useState(false);
const [canceled, setCanceled] = useState(false);

const showModal = () => {
  setIsModalOpen(true);
};

const onClose = () => {
     dispatch(closeCollecitonAsync(id)).then((usersInCollection: User[]) => {
        setUsersList(usersInCollection);
        showModal();
        setDisabled(true);
        return null;
     }).catch(()=>{});   
}
const onCancel = () => {
    setCanceled(true);
    setDisabled(true);
}

return (  
    <div className={`tc-product-card ${count_current_buyers >= count_for_buy ? 'tc-product-card-full' : ' '} ${disabled ? 'tc-product-card-disabled' : ' '} ${canceled ? 'tc-product-card-canceled' : ' '}`} >
        <Card title={`Сбор #${id}`} style={{ width: 300 }}>
            <p>Количество товара: {count_for_buy}</p>
            <p>Суммарная цена: {count_for_buy*collection.product.price}р</p>
            <p>Количество участников: {count_current_buyers}</p>
            <Button onClick={onClose} disabled={disabled}>Закрыть сбор</Button>
            <Button onClick={onCancel} disabled={disabled}>Отменить сбор</Button>
            <Modal title="Список пользователей" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                {usersList.map((user: User) => (
                    <p>{user.username} | {user.address}</p>
                ))}
            </Modal>
        </Card>
    </div>
  )
}
