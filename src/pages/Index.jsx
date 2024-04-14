import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Tag, Wrap, WrapItem } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [inventory, setInventory] = useState([]);
  const [meals, setMeals] = useState(["Colazione", "Pranzo", "Cena"]);
  const [numMeals, setNumMeals] = useState(3);
  const { isOpen: isOpenAddFood, onOpen: onOpenAddFood, onClose: onCloseAddFood } = useDisclosure();
  const { isOpen: isOpenEditMeals, onOpen: onOpenEditMeals, onClose: onCloseEditMeals } = useDisclosure();

  const handleAddFood = (food) => {
    setInventory([...inventory, food]);
  };

  const handleEditMeals = (num) => {
    const newMeals = [];
    for (let i = 1; i <= num; i++) {
      newMeals.push(`Pasto ${i}`);
    }
    setMeals(newMeals);
    setNumMeals(num);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Foodtracker</Heading>
        <Button leftIcon={<FaPlus />} onClick={onOpenAddFood}>
          Aggiungi alimento
        </Button>
      </Flex>

      <Heading size="md" mb={2}>
        Inventario
      </Heading>
      <Wrap mb={4}>
        {inventory.map((food, index) => (
          <WrapItem key={index}>
            <FoodCard food={food} />
          </WrapItem>
        ))}
      </Wrap>

      <Flex justify="space-between" align="center" mb={2}>
        <Heading size="md">Pianificazione pasti</Heading>
        <Button size="sm" onClick={onOpenEditMeals}>
          Modifica
        </Button>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Pasto</Th>
            <Th>Lunedì</Th>
            <Th>Martedì</Th>
            <Th>Mercoledì</Th>
            <Th>Giovedì</Th>
            <Th>Venerdì</Th>
            <Th>Sabato</Th>
            <Th>Domenica</Th>
          </Tr>
        </Thead>
        <Tbody>
          {meals.map((meal, index) => (
            <Tr key={index}>
              <Td>{meal}</Td>
              {[...Array(7)].map((_, i) => (
                <Td key={i}>
                  <MealCell meal={meal} day={i + 1} inventory={inventory} />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AddFoodModal isOpen={isOpenAddFood} onClose={onCloseAddFood} onAddFood={handleAddFood} />
      <EditMealsModal isOpen={isOpenEditMeals} onClose={onCloseEditMeals} numMeals={numMeals} onEditMeals={handleEditMeals} />
    </Box>
  );
};

const FoodCard = ({ food, onEdit }) => {
  const [quantity, setQuantity] = useState(food.quantity);

  const carbs = (food.carbs / food.quantity) * quantity;
  const fats = (food.fats / food.quantity) * quantity;
  const proteins = (food.proteins / food.quantity) * quantity;
  const calories = carbs * 4 + fats * 9 + proteins * 4;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("foodName", food.name);
  };

  return (
    <Box borderWidth={1} borderRadius="md" p={4} draggable onDragStart={handleDragStart}>
      <Flex justify="space-between" align="center">
        <Heading size="sm">{food.name}</Heading>
        <Button size="sm" onClick={() => onEdit(food)}>
          Modifica
        </Button>
      </Flex>
      <Flex align="center" mt={2}>
        <Text mr={2}>Quantità:</Text>
        <NumberInput size="sm" value={quantity} onChange={(_, value) => setQuantity(value)} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text ml={1}>{food.unit}</Text>
      </Flex>
      <Text mt={2}>Calorie: {calories.toFixed(0)}</Text>
      <Text>Carboidrati: {carbs.toFixed(1)}g</Text>
      <Text>Grassi: {fats.toFixed(1)}g</Text>
      <Text>Proteine: {proteins.toFixed(1)}g</Text>
      <Wrap mt={2}>
        {food.tags.map((tag, index) => (
          <WrapItem key={index}>
            <Tag size="sm">{tag}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

const MealCell = ({ meal, day, inventory }) => {
  const [foods, setFoods] = useState([]);

  const handleDrop = (e) => {
    const foodName = e.dataTransfer.getData("foodName");
    const food = inventory.find((f) => f.name === foodName);
    if (food) {
      setFoods([...foods, { ...food, quantity: food.quantity }]);
    }
  };

  const totalCalories = foods.reduce((sum, food) => sum + (food.calories / food.quantity) * food.quantity, 0);
  const totalCarbs = foods.reduce((sum, food) => sum + (food.carbs / food.quantity) * food.quantity, 0);
  const totalFats = foods.reduce((sum, food) => sum + (food.fats / food.quantity) * food.quantity, 0);
  const totalProteins = foods.reduce((sum, food) => sum + (food.proteins / food.quantity) * food.quantity, 0);

  return (
    <Box borderWidth={1} borderRadius="md" p={2} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {foods.map((food, index) => (
        <Box key={index} mb={2}>
          <Text fontSize="sm">{food.name}</Text>
          <NumberInput size="sm" value={food.quantity} onChange={(_, value) => setFoods(foods.map((f, i) => (i === index ? { ...f, quantity: value } : f)))} min={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      ))}
      <Text fontSize="sm" mt={2}>
        Calorie: {totalCalories.toFixed(0)}
      </Text>
      <Text fontSize="sm">Carboidrati: {totalCarbs.toFixed(1)}g</Text>
      <Text fontSize="sm">Grassi: {totalFats.toFixed(1)}g</Text>
      <Text fontSize="sm">Proteine: {totalProteins.toFixed(1)}g</Text>
    </Box>
  );
};

const AddFoodModal = ({ isOpen, onClose, onAddFood }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("g");
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [tags, setTags] = useState([]);

  const handleSubmit = () => {
    onAddFood({
      name,
      quantity,
      unit,
      calories,
      carbs,
      fats,
      proteins,
      tags,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Aggiungi alimento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nome alimento</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Quantità</FormLabel>
            <NumberInput value={quantity} onChange={(_, value) => setQuantity(value)} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Unità di misura</FormLabel>
            <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="g">g</option>
              <option value="cucchiaio">cucchiaio</option>
              <option value="cucchiaino">cucchiaino</option>
              <option value="fetta">fetta</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Calorie</FormLabel>
            <NumberInput value={calories} onChange={(_, value) => setCalories(value)} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Carboidrati (g)</FormLabel>
            <NumberInput value={carbs} onChange={(_, value) => setCarbs(value)} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Grassi (g)</FormLabel>
            <NumberInput value={fats} onChange={(_, value) => setFats(value)} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Proteine (g)</FormLabel>
            <NumberInput value={proteins} onChange={(_, value) => setProteins(value)} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Tag</FormLabel>
            <Select
              isMulti
              placeholder="Seleziona i tag"
              value={tags}
              onChange={(selectedTags) => setTags(selectedTags.map((tag) => tag.value))}
              options={[
                { value: "Colazione", label: "Colazione" },
                { value: "Pranzo", label: "Pranzo" },
                { value: "Cena", label: "Cena" },
              ]}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>Aggiungi</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const EditMealsModal = ({ isOpen, onClose, numMeals, onEditMeals }) => {
  const [num, setNum] = useState(numMeals);

  const handleSubmit = () => {
    onEditMeals(num);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modifica numero pasti</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Numero pasti al giorno</FormLabel>
            <NumberInput value={num} onChange={(_, value) => setNum(value)} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>Salva</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Index;
