import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
	createAutoscrollable,
	createDragArena,
	createDragContext,
	createDragShadow,
	createDropZone,
} from 'react-native-drag-drop';
import cardImages  from "./cardImages";
import Swiper from 'react-native-swiper';
const {
	Animated,
	AppRegistry,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	PanResponder,
	Dimension,
	Image
} = ReactNative;
import Zone from './Zone';

class DragShad extends Component {
	render() {
		let image_id = (this.props.dragItem && this.props.dragItem.id) ? this.props.dragItem.id.split("-")[0] : "";
		return (
			<Animated.View style={[styles.dragShadow, this.props.style]}>
				<Image style={{flex: 1, borderRadius: 10, resizeMode: "contain"}} source={cardImages[image_id]} />
			</Animated.View>
		);
	}
}
const DragShadow = createDragShadow(DragShad);
class DragArena  extends Component {
	constructor(props) {
		super(props);
		let { gameId } = props;
		this.zonesObject = {
							[`P1-R1-Z-${gameId}`]: {"length": 3},
							[`P1-R2-Z-${gameId}`]: {"length": 5},
							[`P1-R3-Z-${gameId}`]: {"length": 5},
							[`VR-Z-${gameId}`]: {"length": 5}
						};
		this.state = {
			card : {
						[`VR-Z-${gameId}`]: [{"id": `2C-${gameId}`, "url": "Ace_clover.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `3C-${gameId}`, "url": "Jack_clover.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `KD-${gameId}`, "url": "Queen_diamond.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `3D-${gameId}`, "url": "king_hearts_01.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `QH-${gameId}`, "url": "hearts_02_0001_Group-1-copy-7.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `JH-${gameId}`, "url": "Ace_clover.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `TS-${gameId}`, "url": "Jack_clover.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `KS-${gameId}`, "url": "Queen_diamond.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `4C-${gameId}`, "url": "king_hearts_01.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `AD-${gameId}`, "url": "hearts_02_0001_Group-1-copy-7.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `7S-${gameId}`, "url": "Jack_clover.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `6S-${gameId}`, "url": "Queen_diamond.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `5C-${gameId}`, "url": "king_hearts_01.png", "zoneId": `VR-Z-${gameId}`},
								{"id": `KC-${gameId}`, "url": "hearts_02_0001_Group-1-copy-7.png", "zoneId": `VR-Z-${gameId}`}],
						[`P1-R1-Z-${gameId}`]: [],
						[`P1-R2-Z-${gameId}`]: [],
						[`P1-R3-Z-${gameId}`]: []
					}
		}
		this.ondrop = this.ondrop.bind(this);
		for (var zn in this.zonesObject) {
			this.zonesObject[zn].component = createDropZone(Zone, zn, gameId);
		}
	}
	ondrop(props, state, panReleased) {
		if(state.dragItem) {
			if(props){
				this.props.setScrollForSwiper(true);
				this.setState((stt)=>{
					var item = {...state.dragItem};
					var zoneId = `${item.zoneId}`;
					if(state.currentDropZone && this.zonesObject[`${state.currentDropZone}`].length > stt.card[state.currentDropZone].length) {
						state.dragItem.zoneId = state.currentDropZone ? state.currentDropZone : state.dragItem.zoneId;
						stt.card[zoneId] = stt.card[zoneId].filter((item)=> {
							return item.old_card ? false : true;
						})
						stt.card[state.currentDropZone].push(state.dragItem);
					} else {
						stt.card[zoneId] = stt.card[zoneId].map((item) => {
							return item.old_card ? item.old_card : item;
						})
					}
					return stt;
				})
			} else if (panReleased) {
				this.setState((stt)=>{
			return stt;
				})
			} else {
				this.setState((stt)=>{
					var item = {...state.dragItem};
					var zoneId = `${item.zoneId}`;
					stt.card[zoneId] = stt.card[zoneId].map((it) => {
						if((it.id != state.dragItem.id) && (+(zoneId.slice(-1) == this.props.gameId))) {
							return it;
						} else {
							return {
								id: "NA",
								zoneId: it.zoneId,
								old_card: it,
								url: ""
								};
						}
					})
					return stt;
				})
			}
		}
	}
	render() {
		const { startDragHandler, scrollEnabled, stopDrag, currentDropZone, setScrollForSwiper } = this.props; // Injected by createDragArena()
		const renderZones = (Zn, zoneName, i) => {
			return (
				<Zn.component
					startDragHandler={startDragHandler}
					data={{"item": this.state.card[zoneName], "length": Zn.length, "zoneName": zoneName}}
					stopDrag={stopDrag}
					ondrop = {this.ondrop}
					setScrollForSwiper={setScrollForSwiper}
					key={i}
					currentDropZone={currentDropZone}
				/>
			)
		}
		return (
			<View style={styles.container}>
				<View style={styles.subContainer}>
					{Object.keys(this.zonesObject).map((zone, i) => {
						return renderZones(this.zonesObject[zone], zone, i);
					})}
				</View>
			</View>
		);
	}
}

var arr = [1, 2, 3, 4, 5];
export default Viewport = createDragArena(DragArena, DragShadow, 'x');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		marginBottom: 30
	},
	subContainer: {
		flex: 1
	},
	draggableThing: {
		margin: 10,
		backgroundColor: "red"
	},
	draggableThingChild: {
		flex: 1
	},
	dragShadow: {
		position: 'absolute', // Don't forget to add position: absolute because position styles are calculated.
		height: 30,
		width: 20,
		justifyContent: "center",
		alignItems: "center",
		margin: 10
	},
	redDropZone: {
		backgroundColor: 'red',
	},
	blueDropZone: {
		backgroundColor: 'lightblue',
	}
});