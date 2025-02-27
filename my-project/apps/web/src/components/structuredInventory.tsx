import { useInventory } from "@/hooks/useInventoryUser";
import { Inventory } from "../utils/models";

const StructuredInventory = ({ item }: { item: string }) => {
  const { data: inventory } = useInventory();
  const inventoryItem =
    inventory?.find((invItem: Inventory) => invItem.category.name === item)
      ?.ingredients || [];
  return inventoryItem;
};

export default StructuredInventory;
