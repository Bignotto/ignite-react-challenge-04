import { Component, createRef, useState, FormEvent } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import { Modal } from "../Modal";
import Input from "../Input";

interface FoodInterface {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
}

interface ModalAddFoodProps {
  handleAddFood: (food: FoodInterface) => Promise<void>;
}

export function ModalAddFood() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  // constructor(props) {
  //   super(props);

  //   this.formRef = createRef();
  // }

  const handleSubmit = async (newFood: FoodInterface) => {
    // const { setIsOpen, handleAddFood } = this.props;

    handleAddFood(newFood);
    // setIsOpen();
  };

  // render() {
  //   const { isOpen, setIsOpen } = this.props;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={this.formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" value={image} />

        <Input name="name" placeholder="Ex: Moda Italiana" value={name} />
        <Input
          name="price"
          placeholder="Ex: 19.90"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />

        <Input name="description" placeholder="Descrição" value={description} />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
  // }
}

export default ModalAddFood;
