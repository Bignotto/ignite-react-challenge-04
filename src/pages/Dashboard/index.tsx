import { useEffect, useState } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       foods: [],
//       editingFood: {},
//       modalOpen: false,
//       editModalOpen: false,
//     };
//   }

interface FoodInterface {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  available: boolean;
}

export function Dashboard() {
  const [foods, setFoods] = useState<FoodInterface[]>([]);
  const [editingFood, setEditingFood] = useState<FoodInterface>(
    {} as FoodInterface
  );

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get("/foods");
      setFoods(response.data);
    }
    loadFoods();
  }, []);

  const handleAddFood = async (food: FoodInterface) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: FoodInterface) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  };

  toggleModal = () => {
    const { modalOpen } = this.state;

    this.setState({ modalOpen: !modalOpen });
  };

  toggleEditModal = () => {
    const { editModalOpen } = this.state;

    this.setState({ editModalOpen: !editModalOpen });
  };

  handleEditFood = food => {
    this.setState({ editingFood: food, editModalOpen: true });
  };

  // render() {
  //   const { modalOpen, editModalOpen, editingFood, foods } = this.state;

  return (
    <>
      <Header openModal={this.toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={this.toggleModal}
        handleAddFood={this.handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={this.toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={this.handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={this.handleDeleteFood}
              handleEditFood={this.handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
  // }
}

export default Dashboard;
