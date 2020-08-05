import {categoriesAdapter} from "./portal-games.reducer";
import {getCategories} from "./portal-games.selector";

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = categoriesAdapter.getSelectors(getCategories);


