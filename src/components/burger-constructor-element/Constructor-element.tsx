import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import styles from "../burger-constructor/burger-constructor.module.css";
import {
	changeOrderInConstructor,
	deleteIngredientFromConstructor,
} from "../../services/actions/burgerConstructor";
import { TElement } from "../../services/utile/types";

type TConstructorElement = {
	index: number;
	element: TElement;
	topOrBottom?: "top" | "bottom";
	extraName?: string;
};

export const ConstructorElementContainer: FC<TConstructorElement> = ({
	element,
	index,
}) => {
	const dispatch = useDispatch();
	const ingredients = useSelector((state: any) => state.burgerConstructor.list);
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
		hover: (item, monitor: any) => {
			const dragIndex = item.index;
			const hoverIndex = index;
			const hoverBoundingRect: any = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

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
