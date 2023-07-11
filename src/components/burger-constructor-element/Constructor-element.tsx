import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useCallback, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import styles from "../burger-constructor/burger-constructor.module.css";
import {
	changeOrderInConstructor,
	deleteIngredientFromConstructor,
} from "../../services/actions/burgerConstructor";
import { TElement, TConstructorElement } from "../../services/types/types";
import {
	useAppDispatch,
	useAppSelector,
} from "../../services/types/typesRedux";

export const ConstructorElementContainer: FC<TConstructorElement> = ({
	element,
	index,
}) => {
	const dispatch = useAppDispatch();
	const ingredients = useAppSelector((state) => state.burgerConstructor.list);
	const ref = useRef<HTMLDivElement | null>(null);
	const [, dragRef] = useDrag({
		type: "item",
		item: { index },
	});

	const moveListItem = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const dragItem = ingredients[dragIndex];
			const hoverItem = ingredients[hoverIndex];
			const updatedIngredients = [...ingredients];
			updatedIngredients[dragIndex] = hoverItem;
			updatedIngredients[hoverIndex] = dragItem;
			dispatch(changeOrderInConstructor(updatedIngredients));
		},
		[ingredients]
	);

	const [, dropRef] = useDrop<TElement, void>({
		accept: "item",
		hover: (item, monitor) => {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const hoverActualY =
				(monitor.getClientOffset() as XYCoord).y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveListItem(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
	});

	const dragDropRef: any = dragRef(dropRef(ref));

	return (
		<div ref={dragDropRef} className={styles.element}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={element.name}
				price={element.price}
				thumbnail={element.image}
				handleClose={() => dispatch(deleteIngredientFromConstructor(element))}
			/>
		</div>
	);
};
