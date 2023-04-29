import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import styles from "../burger-constructor/burger-constructor.module.css";
import PropTypes from "prop-types";
import {
	changeOrderInConstructor,
	deleteIngredientFromConstructor,
} from "../../services/actions/burgerConstructor";

export function ConstructorElementContainer({ element, index }) {
	const dispatch = useDispatch();
	const ingredients = useSelector((state) => state.burgerConstructor.list);

	const [, dragRef] = useDrag({
		type: "item",
		item: { index },
		// collect: (monitor) => ({
		// 	isDragging: monitor.isDragging(),
		// }),
	});

	const moveListItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = ingredients[dragIndex];
			const hoverItem = ingredients[hoverIndex];
			const updatedIngredients = [...ingredients];
			updatedIngredients[dragIndex] = hoverItem;
			updatedIngredients[hoverIndex] = dragItem;
			dispatch(changeOrderInConstructor(updatedIngredients));
		},
		[ingredients]
	);

	const [, dropRef] = useDrop({
		accept: "item",
		hover: (item, monitor) => {
			const dragIndex = item.index;
			const hoverIndex = index;
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveListItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const ref = useRef(null);
	const dragDropRef = dragRef(dropRef(ref));

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
}

ConstructorElementContainer.propTypes = {
	index: PropTypes.number.isRequired,
	element: PropTypes.object.isRequired,
};
