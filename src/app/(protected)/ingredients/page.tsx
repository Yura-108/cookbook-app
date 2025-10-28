import IngredientForm from "@/forms/ingredient.form";
import IngredientsTable from "@/components/UI/tables/ingredients";

const ingredientsPage = () => {
  return (
    <div style={{height: "fit-content"}}>
      <IngredientForm />
      <IngredientsTable />
    </div>
  )
}

export default ingredientsPage;