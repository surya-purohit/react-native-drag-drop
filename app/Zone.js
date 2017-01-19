import React, { Component } from 'react';
import ReactNative from 'react-native';
import cardImages  from "./cardImages";
const {
	Animated,
	AppRegistry,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	PanResponder,
	Image,
	ScrollView
} = ReactNative;
class DraggableThing extends Component {
	constructor(props) {
		super(props);
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder : () => {
				// to set the scrollView of Swiper to false
				// props.setScrollForSwiper(false);
				if(this.props.item) {
					this.props.ondrop(null, {dragItem: this.props.item, "currentDropZone": this.props.data.zoneName});
					this.props.onLongPress();
					return true;
				}
				return false;
			},
			onPanResponderRelease: (e,g) => {
				if(this.props.item) {
					return this.props.stopDrag();
				}
				return false;
				// to set the scrollView of Swiper to true
				// props.setScrollForSwiper(true);
			}
		});
	}

	render() {
		const { onLayout, onLongPress, item, setScrollForSwiper } = this.props;
		let image_id = (item && item.id) ? item.id.split("-")[0] : "";
		return (
			<View
				style={styles.draggableThing}
				onLayout={onLayout}
				{...this.panResponder.panHandlers} >
				{item ? (<Image style={{flex: 1, borderRadius: 10, resizeMode: "contain"}} source={cardImages[image_id]} />) : null}
			</View>
		);
	}
}
export default class Zone extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			onDragItemLayout, // Injected by createDropZone()
			startDragHandler,
			data,
			scrollEnabled,
			dragItem,
			ondrop,
			stopDrag,
			setScrollForSwiper
		} = this.props;

		let arry = Array.apply(null, Array(data.length)).map(function (x, i) { return i; });
		return (
			<View style={[this.props.style, styles.blueDropZone]}>
				{
					arry.map((z, j) => {
						return (
							<DraggableThing
								onLayout={(e) => onDragItemLayout(data.item[j], e)}
								onLongPress={() => startDragHandler(data.item[j])}
								item={data.item[j]} key={j} ondrop={ondrop}
								data={data} stopDrag={stopDrag} setScrollForSwiper={setScrollForSwiper}>
							</DraggableThing>
						);
					})
				}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	draggableThing: {
		width: 35,
		justifyContent: "center",
		alignItems: "center",
		height: 45,
		borderColor: 'darkgrey',
		borderWidth: 1,
		borderRadius: 2,
		margin: 10
	},
	draggableThingChild: {
		flex: 1
	},
	dragShadow: {
		position: 'absolute', // Don't forget to add position: absolute because position styles are calculated.
		backgroundColor: 'green',
	},
	redDropZone: {
		backgroundColor: 'red',
	},
	blueDropZone: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
});